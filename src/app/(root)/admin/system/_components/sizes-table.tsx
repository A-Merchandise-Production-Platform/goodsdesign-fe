"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { useSizes } from "../_hooks/use-sizes"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Badge } from "@/components/ui/badge"

export function SizesTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSize, setEditingSize] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    isActive: true,
  })

  const {
    sizes,
    isLoading,
    error,
    createSize,
    updateSize,
    deleteSize,
    restoreSize,
    isCreating,
    isUpdating,
    isDeleting,
    isRestoring,
  } = useSizes(true) // Include soft-deleted sizes

  const filteredSizes = sizes.filter(
    (size) =>
      size.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async () => {
    try {
      if (editingSize) {
        await updateSize({ id: editingSize, data: formData })
      } else {
        await createSize(formData)
      }
      setIsAddDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving size:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this size?")) {
      await deleteSize(id)
    }
  }

  const handleRestore = async (id: string) => {
    await restoreSize(id)
  }

  const resetForm = () => {
    setFormData({
      code: "",
      isActive: true,
    })
    setEditingSize(null)
  }

  if (error) return <div>Error loading sizes</div>

  return (
    <div className="space-y-4 bg-background rounded-md p-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sizes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Size
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSize ? "Edit Size" : "Add New Size"}</DialogTitle>
              <DialogDescription>
                Fill in the details for the {editingSize ? "size update" : "new size configuration"}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <Label htmlFor="isActive">Is Active</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false)
                resetForm()
              }}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? (
                  <LoadingSpinner className="mr-2" />
                ) : null}
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  <LoadingSpinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredSizes.length > 0 ? (
              filteredSizes.map((size) => (
                <TableRow key={size.id}>
                  <TableCell>{size.code}</TableCell>
                  <TableCell>
                    <Badge variant={size.isActive ? "success" : "destructive"}>
                      {size.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {!size.deletedAt ? (
                          <>
                            <DropdownMenuItem
                              onClick={() => {
                                const sizeToEdit = sizes.find((s) => s.id === size.id)
                                if (sizeToEdit) {
                                  setEditingSize(size.id)
                                  setFormData({
                                    code: sizeToEdit.code,
                                    isActive: sizeToEdit.isActive,
                                  })
                                  setIsAddDialogOpen(true)
                                }
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(size.id)}
                              className="text-destructive"
                            >
                              Delete
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem onClick={() => handleRestore(size.id)}>
                            Restore
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 