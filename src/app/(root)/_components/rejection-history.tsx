"use client"

import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, MapPin, User } from "lucide-react"
import Image from "next/image"
import { RejectedOrderEntity } from "@/graphql/generated/graphql"

interface RejectionHistoryProps {
  rejectedHistory?: Array<{
    __typename?: "RejectedOrderEntity"
    rejectedAt: any
    reassignedTo?: string | null
    reassignedAt?: any
    reason: string
    id: string
    factory?: {
      __typename?: "FactoryEntity"
      name: string
      contractUrl?: string | null
      address?: {
        __typename?: "AddressEntity"
        wardCode: string
        street: string
        districtID: number
        provinceID: number
      } | null
      owner?: {
        __typename?: "UserEntity"
        name?: string | null
        email?: string | null
        imageUrl?: string | null
      } | null
    } | null
  }> | null
}

export function RejectionHistory({ rejectedHistory = [] }: RejectionHistoryProps) {
  if (!rejectedHistory?.length) {
    return null
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Rejection History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rejectedHistory.map((rejection) => (
            <div
              key={rejection.id}
              className="rounded-lg border bg-card p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{rejection.factory?.name || "Unknown Factory"}</span>
                </div>
                <Badge variant="destructive">Rejected</Badge>
              </div>

              <div className="mb-3">
                <p className="text-sm text-muted-foreground">Reason:</p>
                <p className="mt-1">{rejection.reason || "No reason provided"}</p>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Rejected on {formatDate(rejection.rejectedAt)}
                </span>
              </div>

              {rejection.factory?.address?.street && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {rejection.factory.address.street}
                  </span>
                </div>
              )}

              {rejection.factory?.owner && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border">
                    <Image
                      src={rejection.factory.owner.imageUrl || "/placeholder.svg"}
                      alt={rejection.factory.owner.name || "Factory Owner"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{rejection.factory.owner.name || "Unknown Owner"}</p>
                    {rejection.factory.owner.email && (
                      <p className="text-xs text-muted-foreground">
                        {rejection.factory.owner.email}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 