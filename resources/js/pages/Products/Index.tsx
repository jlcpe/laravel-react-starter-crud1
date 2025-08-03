import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    products: Product[];
}

export default function Index() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { products, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedProduct) {
            destroy(route('products.destroy', selectedProduct.id));
        }
        setDialogOpen(false);
        setSelectedProduct(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-4">
                <Link href={route('products.create')}>
                    <Button>Create a Product</Button>
                </Link>
            </div>
            <div className="m-4">
                {flash.message && (
                    <Alert>
                        <Megaphone />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>
            <div className="m-4">
                {products.length > 0 && (
                    <Table>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Link href={route('products.edit', product.id)}>
                                            <Button className="bg-slate-600 hover:bg-slate-700">Edit</Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDeleteClick(product)}
                                            className="bg-red-500 hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete{' '}
                            <span className="font-bold">{selectedProduct?.name}</span> and remove its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
