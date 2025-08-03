import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';



interface Product {
    id:number,
    name:string,
    price:string,
    description:string
}

interface Props {
    product: Product;
}

export default function Index({product}: Props) {
    const {data, setData, put, processing, errors} = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit Product', href: `/products/${product.id}/edit`}]}>
            <Head title="Create a New Product" />
            <div className="w-8/12 p-4">
                <form action="" onSubmit={handleUpdate} className="space-y-4">
                    {/* Diplay Error  */}

                    {Object.keys(errors).length > 0 && (
                        <Alert >
                            <CircleAlert  />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>
                                           {message as string}
                                        </li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div>
                        <Label htmlFor="product name">Name</Label>
                        <Input placeholder="Product Name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input placeholder="Price" value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            placeholder="Product Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        ></Textarea>
                    </div>
                    <Button disabled={processing} type="submit">Update Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
