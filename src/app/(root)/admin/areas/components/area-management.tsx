'use client';

import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AreaApi } from '@/api/area';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Area } from '@/types/area';

import AreaManagementSkeleton from './area-management-skeleton';

export default function AreaManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState<Area[]>([]);
  const [editingArea, setEditingArea] = useState<Area>();
  const [newArea, setNewArea] = useState<Omit<Area, 'id'>>({
    name: '',
    position: '',
    code: '',
    isDeleted: false,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch all areas with OData
  const fetchAreas = async () => {
    setLoading(true);
    const options = {
      filter: { isDeleted: false },
      select: ['id', 'name', 'position', 'code', 'isDeleted'],
    };
    const response = await AreaApi.getAll(options);
    if (response.isSuccess) {
      setAreas(response.data);
    } else {
      toast.error(response.message || 'Failed to fetch areas');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const addArea = async () => {
    if (newArea.name && newArea.position && newArea.code) {
      const response = await AreaApi.create(newArea);
      if (response.isSuccess && response.data) {
        setAreas([...areas, response.data]);
        setNewArea({ name: '', position: '', code: '', isDeleted: false });
        setIsAddModalOpen(false);
        toast.success('Area added successfully!');
      } else {
        toast.error(response.message || 'Failed to add area');
      }
    } else {
      toast.error('Please fill out all fields before adding an area.');
    }
  };

  const updateArea = async () => {
    if (editingArea) {
      const response = await AreaApi.update(editingArea.id, editingArea);
      if (response.isSuccess && response.data) {
        setAreas(
          areas.map(area =>
            area.id === editingArea.id ? response.data! : area,
          ),
        );
        setEditingArea(undefined);
        toast.success('Area updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update area');
      }
    }
  };

  const deleteArea = async (id: string) => {
    const response = await AreaApi.deleteById(id);
    if (response.isSuccess) {
      setAreas(areas.filter(area => area.id !== id));
      toast.success('Area deleted successfully!');
    } else {
      toast.error(response.message || 'Failed to delete area');
    }
  };

  const viewAreaDetails = (area: Area) => {
    router.push(`/areas/${area.id}`);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" /> Add Area
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Area</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newArea.name}
                  onChange={event =>
                    setNewArea({ ...newArea, name: event.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Input
                  id="position"
                  value={newArea.position}
                  onChange={event =>
                    setNewArea({ ...newArea, position: event.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  value={newArea.code}
                  onChange={event =>
                    setNewArea({ ...newArea, code: event.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addArea}>Add Area</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      {loading ? (
        <AreaManagementSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Area Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Area Code</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas.map(area => (
              <TableRow key={area.id} onClick={() => viewAreaDetails(area)}>
                <TableCell>{area.name}</TableCell>
                <TableCell>{area.position}</TableCell>
                <TableCell>{area.code}</TableCell>
                <TableCell onClick={event => event.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingArea(area)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-400 focus:text-red-500"
                        onClick={() => deleteArea(area.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {editingArea && (
        <Dialog
          open={!!editingArea}
          onOpenChange={() => setEditingArea(undefined)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Area</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingArea.name}
                  onChange={event =>
                    setEditingArea({
                      ...editingArea,
                      name: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-position" className="text-right">
                  Position
                </Label>
                <Input
                  id="edit-position"
                  value={editingArea.position}
                  onChange={event =>
                    setEditingArea({
                      ...editingArea,
                      position: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-code" className="text-right">
                  Code
                </Label>
                <Input
                  id="edit-code"
                  value={editingArea.code}
                  onChange={event =>
                    setEditingArea({
                      ...editingArea,
                      code: event.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={updateArea}>Update Area</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
