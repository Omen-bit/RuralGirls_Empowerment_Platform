"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { doc, getDoc, collection, addDoc, getDocs, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { useToast } from "@/components/ui/use-toast"
import {
  ShoppingBag,
  Plus,
  Edit,
  Trash,
  Tag,
  DollarSign,
  Package,
  TrendingUp,
  ShoppingCart,
  Share2,
  MessageSquare,
  Smartphone,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

type Product = {
  id: string
  name: string
  productId: string
  description: string
  category: string
  price: number
  available: boolean
  imageUrl: string
  createdAt: any
  updatedAt: any
}

type Order = {
  id: string
  productId: string
  productName: string
  customerName: string
  customerPhone: string
  quantity: number
  totalPrice: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  orderDate: any
}

export default function BusinessPage() {
  const { user, db } = useFirebase()
  const { toast } = useToast()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [isEditingProduct, setIsEditingProduct] = useState<string | null>(null)

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    productId: "",
    description: "",
    category: "",
    price: "",
    available: true,
    imageUrl: "/placeholder.svg?height=200&width=200",
  })

  // Business stats
  const [businessStats, setBusinessStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        }

        // Fetch products
        await fetchProducts()

        // Fetch orders
        await fetchOrders()
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user, db])

  useEffect(() => {
    // Calculate business stats
    if (products.length > 0 || orders.length > 0) {
      const totalRevenue = orders.reduce((sum, order) => {
        return order.status !== "cancelled" ? sum + order.totalPrice : sum
      }, 0)

      const pendingOrders = orders.filter((order) => order.status === "pending").length

      setBusinessStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
      })
    }
  }, [products, orders])

  const fetchProducts = async () => {
    if (!user) return

    try {
      const productsRef = collection(db, "users", user.uid, "products")
      const productsSnapshot = await getDocs(productsRef)

      const productsList: Product[] = []
      productsSnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() } as Product)
      })

      setProducts(productsList)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const fetchOrders = async () => {
    if (!user) return

    try {
      const ordersRef = collection(db, "users", user.uid, "orders")
      const ordersSnapshot = await getDocs(ordersRef)

      const ordersList: Order[] = []
      ordersSnapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() } as Order)
      })

      setOrders(ordersList)
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  const handleAddProduct = async () => {
    if (!user) return

    try {
      // Validate form
      if (!newProduct.name || !newProduct.productId || !newProduct.price) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      // Add product to Firestore
      const productsRef = collection(db, "users", user.uid, "products")
      await addDoc(productsRef, {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      // Reset form and refresh products
      setNewProduct({
        name: "",
        productId: "",
        description: "",
        category: "",
        price: "",
        available: true,
        imageUrl: "/placeholder.svg?height=200&width=200",
      })

      setIsAddingProduct(false)
      await fetchProducts()

      toast({
        title: "Product Added",
        description: "Your product has been added successfully.",
      })
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditProduct = async (productId: string) => {
    if (!user) return

    try {
      const productToEdit = products.find((p) => p.id === productId)
      if (!productToEdit) return

      setNewProduct({
        name: productToEdit.name,
        productId: productToEdit.productId,
        description: productToEdit.description,
        category: productToEdit.category,
        price: productToEdit.price.toString(),
        available: productToEdit.available,
        imageUrl: productToEdit.imageUrl,
      })

      setIsEditingProduct(productId)
      setIsAddingProduct(true)
    } catch (error) {
      console.error("Error setting up product edit:", error)
    }
  }

  const handleUpdateProduct = async () => {
    if (!user || !isEditingProduct) return

    try {
      // Validate form
      if (!newProduct.name || !newProduct.productId || !newProduct.price) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      // Update product in Firestore
      const productRef = doc(db, "users", user.uid, "products", isEditingProduct)
      await updateDoc(productRef, {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        updatedAt: serverTimestamp(),
      })

      // Reset form and refresh products
      setNewProduct({
        name: "",
        productId: "",
        description: "",
        category: "",
        price: "",
        available: true,
        imageUrl: "/placeholder.svg?height=200&width=200",
      })

      setIsAddingProduct(false)
      setIsEditingProduct(null)
      await fetchProducts()

      toast({
        title: "Product Updated",
        description: "Your product has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!user) return

    try {
      // Delete product from Firestore
      await deleteDoc(doc(db, "users", user.uid, "products", productId))

      // Refresh products
      await fetchProducts()

      toast({
        title: "Product Deleted",
        description: "Your product has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleShareToWhatsApp = (product: Product) => {
    // In a real app, this would generate a WhatsApp share link with product details
    const message = `Check out my product: ${product.name}\n\nDescription: ${product.description}\n\nPrice: $${product.price}\n\nProduct ID: ${product.productId}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Business</h1>
          <p className="text-gray-500">Manage your products and track your orders</p>
        </div>
        <Button onClick={() => setIsAddingProduct(true)} className="bg-primary hover:bg-primary/90 btn-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Business Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Products</p>
                <p className="text-3xl font-bold text-blue-900">{businessStats.totalProducts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-700">Total Revenue</p>
                <p className="text-3xl font-bold text-green-900">₹{businessStats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-amber-700">Total Orders</p>
                <p className="text-3xl font-bold text-amber-900">{businessStats.totalOrders}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <ShoppingCart className="h-6 w-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-red-700">Pending Orders</p>
                <p className="text-3xl font-bold text-red-900">{businessStats.pendingOrders}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WhatsApp Integration Card */}
      <Card className="bg-gradient-to-r from-green-50 to-transparent border-green-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-green-600" />
            <CardTitle>WhatsApp Business Integration</CardTitle>
          </div>
          <CardDescription>
            Your products automatically sync with WhatsApp, allowing customers to browse and order directly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 border-b pb-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp Business</p>
                  <p className="text-xs text-gray-500">Connected to +91 98765 43210</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Product Catalog Synced</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Order Management Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Customer Support Ready</span>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <p className="text-sm">
                Your WhatsApp Business account is connected and synced with your product catalog. Customers can now:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Browse Products</p>
                    <p className="text-xs text-gray-500">View your entire catalog</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Place Orders</p>
                    <p className="text-xs text-gray-500">Order directly via chat</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Ask Questions</p>
                    <p className="text-xs text-gray-500">Get product information</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Track Orders</p>
                    <p className="text-xs text-gray-500">Check order status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          {products.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Products Yet</h3>
                <p className="text-gray-500 mb-4">Start adding your products to showcase them to customers.</p>
                <Button onClick={() => setIsAddingProduct(true)} className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Product
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden card-hover-effect">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.imageUrl || "/placeholder.svg?height=200&width=300"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {!product.available && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-white">
                        {product.category || "Uncategorized"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <p className="font-bold text-primary">₹{product.price.toFixed(2)}</p>
                    </div>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Tag className="h-3 w-3 mr-1" />
                      Product ID: {product.productId}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 border-t pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleShareToWhatsApp(product)}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-500 border-red-200">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Product</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this product? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {}}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          {orders.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Orders Yet</h3>
                <p className="text-gray-500 mb-4">When customers place orders, they will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage and track your customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 md:mb-0">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <ShoppingCart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{order.productName}</h3>
                          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1">
                            <Badge variant="outline">{order.productId}</Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(order.orderDate?.toDate()).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="mt-2 md:mt-1">
                            <p className="text-sm">
                              <span className="text-gray-500">Customer:</span> {order.customerName} (
                              {order.customerPhone})
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          <span className="font-medium">Qty: {order.quantity}</span>
                        </div>
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          <span className="font-medium">₹{order.totalPrice.toFixed(2)}</span>
                        </div>
                        <Badge
                          className={
                            order.status === "pending"
                              ? "bg-amber-500"
                              : order.status === "confirmed"
                                ? "bg-blue-500"
                                : order.status === "shipped"
                                  ? "bg-purple-500"
                                  : order.status === "delivered"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {isEditingProduct
                ? "Update your product information below."
                : "Fill in the details below to add a new product to your catalog."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="e.g., Handmade Soap"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productId">Product ID</Label>
              <Input
                id="productId"
                value={newProduct.productId}
                onChange={(e) => setNewProduct({ ...newProduct, productId: e.target.value })}
                placeholder="e.g., SOAP-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="handicrafts">Handicrafts</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="food">Food Products</SelectItem>
                  <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                  <SelectItem value="home">Home Decor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="e.g., 250"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Describe your product..."
                rows={3}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500">
                Enter a URL for your product image or use the default placeholder.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                checked={newProduct.available}
                onCheckedChange={(checked) => setNewProduct({ ...newProduct, available: checked })}
              />
              <Label htmlFor="available">Product is available for sale</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddingProduct(false)
                setIsEditingProduct(null)
                setNewProduct({
                  name: "",
                  productId: "",
                  description: "",
                  category: "",
                  price: "",
                  available: true,
                  imageUrl: "/placeholder.svg?height=200&width=200",
                })
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={isEditingProduct ? handleUpdateProduct : handleAddProduct}
              className="bg-primary hover:bg-primary/90"
            >
              {isEditingProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
