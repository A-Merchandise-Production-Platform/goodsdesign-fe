"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useSystemConfigOrderQuery, useUpdateSystemConfigOrderMutation } from "@/graphql/generated/graphql"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SystemConfigOrder() {
  const { data, loading } = useSystemConfigOrderQuery()
  const [updateConfigOrder, { loading: updateConfigOrderLoading }] = useUpdateSystemConfigOrderMutation()
  const [configValues, setConfigValues] = useState<Record<string, number>>({})
  const [editedFields, setEditedFields] = useState<Set<string>>(new Set())

  // Scoring weight fields
  const scoringWeightFields = [
    "capacityScoreWeight",
    "leadTimeScoreWeight",
    "specializationScoreWeight",
    "legitPointScoreWeight",
    "productionCapacityScoreWeight",
  ]

  // Calculate total weight and validation status
  const { totalWeight, isValidWeights } = useMemo(() => {
    const total = scoringWeightFields.reduce((sum, key) => sum + (configValues[key] || 0), 0)
    return {
      totalWeight: Number.parseFloat(total.toFixed(2)),
      isValidWeights: Math.abs(total - 1) < 0.001, // Allow for small floating point errors
    }
  }, [configValues, scoringWeightFields])

  useEffect(() => {
    if (data?.systemConfigOrder) {
      const initialValues: Record<string, number> = {}
      Object.entries(data.systemConfigOrder).forEach(([key, value]) => {
        if (key !== "__typename" && typeof value === "number") {
          initialValues[key] = value
        }
      })
      setConfigValues(initialValues)
    }
  }, [data])

  const handleInputChange = (key: string, value: string) => {
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue)) {
      setConfigValues((prev) => ({ ...prev, [key]: numValue }))
      setEditedFields((prev) => new Set(prev).add(key))
    }
  }

  const handleUpdateConfig = (key: string) => {
    // For scoring weights, only allow update if total is valid
    if (scoringWeightFields.includes(key) && !isValidWeights) {
      return
    }

    if (editedFields.has(key)) {
      updateConfigOrder({
        variables: {
          updateConfigInput: {
            ...configValues,
            [key]: configValues[key],
          },
        },
        onCompleted: () => {
          setEditedFields((prev) => {
            const updated = new Set(prev)
            updated.delete(key)
            return updated
          })
        },
      })
    }
  }

  const handleUpdateAllChanges = () => {
    // Don't allow saving scoring weights if total is not 1
    if (scoringWeightFields.some((field) => editedFields.has(field)) && !isValidWeights) {
      return
    }

    const changedValues: Record<string, number> = {}
    editedFields.forEach((key) => {
      changedValues[key] = configValues[key]
    })

    if (Object.keys(changedValues).length > 0) {
      updateConfigOrder({
        variables: {
          updateConfigInput: {
            ...configValues,
            ...changedValues,
          },
        },
        onCompleted: () => {
          setEditedFields(new Set())
        },
      })
    }
  }

  // Get color for weight validation
  const getWeightValidationColor = () => {
    if (isValidWeights) return "text-green-500"
    if (totalWeight > 1) return "text-red-500"
    return "text-amber-500"
  }

  // Get progress color for weight total
  const getProgressColor = () => {
    if (isValidWeights) return "bg-green-500"
    if (totalWeight > 1) return "bg-red-500"
    return "bg-amber-500"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">System Configuration</h2>
        <Button
          onClick={handleUpdateAllChanges}
          disabled={
            updateConfigOrderLoading ||
            (scoringWeightFields.some((field) => editedFields.has(field)) && !isValidWeights)
          }
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {updateConfigOrderLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save All Changes
        </Button>
      </div>

      {/* Scoring Weights Section */}
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="">Scoring Weights</CardTitle>
              <CardDescription>Configure the importance of each factor in factory selection</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`flex items-center gap-2 font-medium ${getWeightValidationColor()}`}>
                    {isValidWeights ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    Total: {totalWeight}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {isValidWeights ? "Weights are valid! Total equals 1." : "Weights must sum to exactly 1.0"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Weight validation alert */}
          {!isValidWeights && editedFields.size > 0 && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Scoring weights must sum to exactly 1.0. Current total: {totalWeight}</AlertDescription>
            </Alert>
          )}

          {/* Weight visualization */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>0</span>
              <span>0.5</span>
              <span>1.0</span>
            </div>
            <Progress value={totalWeight * 100} max={100} className={`h-2 ${getProgressColor()}`} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
          {scoringWeightFields.map((field) => {
            const labels: Record<string, string> = {
              capacityScoreWeight: "Capacity Score Weight",
              leadTimeScoreWeight: "Lead Time Score Weight",
              specializationScoreWeight: "Specialization Score Weight",
              legitPointScoreWeight: "Legit Point Score Weight",
              productionCapacityScoreWeight: "Production Capacity Score Weight",
            }

            const descriptions: Record<string, string> = {
              capacityScoreWeight: "Weight for available capacity in factory scoring (25% default)",
              leadTimeScoreWeight: "Weight for production lead time in factory scoring (15% default)",
              specializationScoreWeight: "Weight for product specialization in factory scoring (15% default)",
              legitPointScoreWeight: "Weight for factory reliability in scoring (25% default)",
              productionCapacityScoreWeight: "Weight for product-specific capacity in scoring (20% default)",
            }

            return (
              <ConfigField
                key={field}
                label={labels[field]}
                name={field}
                value={configValues[field]}
                description={descriptions[field]}
                onChange={(value) => handleInputChange(field, value)}
                onSave={() => handleUpdateConfig(field)}
                isEdited={editedFields.has(field)}
                isLoading={updateConfigOrderLoading}
                isValid={isValidWeights || !scoringWeightFields.includes(field)}
                step="0.05"
                min="0"
                max="1"
              />
            )
          })}
        </CardContent>
      </Card>

      {/* Thresholds and Limits Section */}
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-slate-800">Thresholds and Limits</CardTitle>
          <CardDescription>Configure system-wide thresholds for factory qualification and operation</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
          <ConfigField
            label="Legit Point To Suspend"
            name="legitPointToSuspend"
            value={configValues.legitPointToSuspend}
            description="Minimum legitimacy points required for factory eligibility"
            onChange={(value) => handleInputChange("legitPointToSuspend", value)}
            onSave={() => handleUpdateConfig("legitPointToSuspend")}
            isEdited={editedFields.has("legitPointToSuspend")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />

          <ConfigField
            label="Max Legit Point"
            name="maxLegitPoint"
            value={configValues.maxLegitPoint}
            description="Maximum legitimacy points a factory can achieve"
            onChange={(value) => handleInputChange("maxLegitPoint", value)}
            onSave={() => handleUpdateConfig("maxLegitPoint")}
            isEdited={editedFields.has("maxLegitPoint")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />

          <ConfigField
            label="Reduce Legit Point If Reject"
            name="reduceLegitPointIfReject"
            value={configValues.reduceLegitPointIfReject}
            description="Points deducted when a factory rejects an order"
            onChange={(value) => handleInputChange("reduceLegitPointIfReject", value)}
            onSave={() => handleUpdateConfig("reduceLegitPointIfReject")}
            isEdited={editedFields.has("reduceLegitPointIfReject")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />

          <ConfigField
            label="Limit Factory Reject Orders"
            name="limitFactoryRejectOrders"
            value={configValues.limitFactoryRejectOrders}
            description="Maximum number of a order can be rejected by factories - If exceed, the order will be need to be handled by manager"
            onChange={(value) => handleInputChange("limitFactoryRejectOrders", value)}
            onSave={() => handleUpdateConfig("limitFactoryRejectOrders")}
            isEdited={editedFields.has("limitFactoryRejectOrders")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />

          <ConfigField
            label="Limit Rework Times"
            name="limitReworkTimes"
            value={configValues.limitReworkTimes}
            description="Maximum number of times an order can be reworked"
            onChange={(value) => handleInputChange("limitReworkTimes", value)}
            onSave={() => handleUpdateConfig("limitReworkTimes")}
            isEdited={editedFields.has("limitReworkTimes")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />

          <ConfigField
            label="Max Production Time (minutes)"
            name="maxProductionTimeInMinutes"
            value={configValues.maxProductionTimeInMinutes}
            description="Maximum production time threshold for specialization scoring"
            onChange={(value) => handleInputChange("maxProductionTimeInMinutes", value)}
            onSave={() => handleUpdateConfig("maxProductionTimeInMinutes")}
            isEdited={editedFields.has("maxProductionTimeInMinutes")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />

          <ConfigField
            label="Max Production Capacity"
            name="maxProductionCapacity"
            value={configValues.maxProductionCapacity}
            description="Maximum production capacity threshold for capacity scoring"
            onChange={(value) => handleInputChange("maxProductionCapacity", value)}
            onSave={() => handleUpdateConfig("maxProductionCapacity")}
            isEdited={editedFields.has("maxProductionCapacity")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />
        </CardContent>
      </Card>

      {/* Time and Scheduling Section */}
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="">Time and Scheduling</CardTitle>
          <CardDescription>Configure time-related parameters for order processing</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
          <ConfigField
            label="Accept Hours For Factory"
            name="acceptHoursForFactory"
            value={configValues.acceptHoursForFactory}
            description="Hours allowed for a factory to accept an order"
            onChange={(value) => handleInputChange("acceptHoursForFactory", value)}
            onSave={() => handleUpdateConfig("acceptHoursForFactory")}
            isEdited={editedFields.has("acceptHoursForFactory")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />

          <ConfigField
            label="Check Quality Times (days)"
            name="checkQualityTimesDays"
            value={configValues.checkQualityTimesDays}
            description="Days allowed for quality inspection"
            onChange={(value) => handleInputChange("checkQualityTimesDays", value)}
            onSave={() => handleUpdateConfig("checkQualityTimesDays")}
            isEdited={editedFields.has("checkQualityTimesDays")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />

          <ConfigField
            label="Shipping Days"
            name="shippingDays"
            value={configValues.shippingDays}
            description="Standard days for shipping completed orders"
            onChange={(value) => handleInputChange("shippingDays", value)}
            onSave={() => handleUpdateConfig("shippingDays")}
            isEdited={editedFields.has("shippingDays")}
            isLoading={updateConfigOrderLoading}
            isValid={true}
            step="1"
            min="0"
          />
        </CardContent>
      </Card>
    </div>
  )
}

interface ConfigFieldProps {
  label: string
  name: string
  value: number
  description: string
  onChange: (value: string) => void
  onSave: () => void
  isEdited: boolean
  isLoading: boolean
  isValid: boolean
  step?: string
  min?: string
  max?: string
}

function ConfigField({
  label,
  name,
  value,
  description,
  onChange,
  onSave,
  isEdited,
  isLoading,
  isValid,
  step = "0.01",
  min,
  max,
}: ConfigFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="font-medium">
        {label}
      </Label>
      <div className="flex gap-2">
        <Input
          id={name}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          step={step}
          min={min}
          max={max}
          className={`${isEdited ? (isValid ? "border-emerald-500" : "border-red-500") : "border-slate-200"} 
                     focus:border-emerald-500 focus:ring-emerald-500 transition-colors`}
        />
        {isEdited && (
          <Button
            size="sm"
            onClick={onSave}
            disabled={isLoading || !isValid}
            className={`${isValid ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-400 cursor-not-allowed"}`}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
          </Button>
        )}
      </div>
      <p className="text-sm text-primary">{description}</p>
    </div>
  )
}
