import { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  BookOpen,
  X,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { books } from '@/data/mockData';
import { Book, CartItem } from '@/types/lms';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function LibraryPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const departments = [...new Set(books.map((b) => b.department).filter(Boolean))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === 'all' || book.department === departmentFilter;
    const matchesFormat =
      formatFilter === 'all' || book.format === formatFilter || book.format === 'Both';
    return matchesSearch && matchesDepartment && matchesFormat;
  });

  const addToCart = (book: Book, format: 'PDF' | 'Physical' = 'PDF') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id && item.format === format);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id && item.format === format
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1, format }];
    });
    toast({
      title: 'Added to cart',
      description: `${book.title} has been added to your cart`,
    });
  };

  const removeFromCart = (bookId: string, format: 'PDF' | 'Physical') => {
    setCart((prev) => prev.filter((item) => !(item.book.id === bookId && item.format === format)));
  };

  const updateQuantity = (bookId: string, format: 'PDF' | 'Physical', delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.book.id === bookId && item.format === format
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setShowCheckout(false);
    setOrderComplete(true);
    setCart([]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Library & Bookstore</h1>
          <p className="text-muted-foreground mt-1">
            Browse and purchase course materials
          </p>
        </div>
        
        {/* Cart Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Your Cart ({cartCount} items)
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex-1 overflow-y-auto">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.book.id}-${item.format}`}
                      className="flex items-center gap-4 rounded-xl border border-border p-4"
                    >
                      <div className="flex h-16 w-12 items-center justify-center rounded-lg bg-secondary">
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {item.book.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-[10px]">
                            {item.format}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatPrice(item.book.price)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.book.id, item.format, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQuantity(item.book.id, item.format, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive"
                          onClick={() => removeFromCart(item.book.id, item.format)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-xl font-bold text-foreground">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>
                    <Button
                      variant="gradient"
                      className="w-full"
                      size="lg"
                      onClick={() => setShowCheckout(true)}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept!}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={formatFilter} onValueChange={setFormatFilter}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Formats</SelectItem>
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="Physical">Physical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Book Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((book, index) => (
          <Card
            key={book.id}
            variant="interactive"
            className="cursor-pointer animate-slide-up overflow-hidden"
            style={{ animationDelay: `${index * 0.03}s` }}
            onClick={() => setSelectedBook(book)}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-primary/40" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={book.format === 'PDF' ? 'info' : book.format === 'Physical' ? 'success' : 'secondary'}>
                  {book.format}
                </Badge>
                {!book.inStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
              <p className="text-lg font-bold text-primary">{formatPrice(book.price)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-foreground mb-1">No books found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Book Detail Modal */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-xl">
          {selectedBook && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={selectedBook.format === 'PDF' ? 'info' : selectedBook.format === 'Physical' ? 'success' : 'secondary'}>
                    {selectedBook.format}
                  </Badge>
                  {selectedBook.department && (
                    <Badge variant="outline">{selectedBook.department}</Badge>
                  )}
                </div>
                <DialogTitle className="text-xl">{selectedBook.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="flex gap-6">
                  <div className="w-32 h-44 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <BookOpen className="h-12 w-12 text-primary/40" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground mb-1">by {selectedBook.author}</p>
                    <p className="text-2xl font-bold text-primary mb-2">
                      {formatPrice(selectedBook.price)}
                    </p>
                    <p className="text-xs text-muted-foreground">ISBN: {selectedBook.isbn}</p>
                    {!selectedBook.inStock && (
                      <Badge variant="destructive" className="mt-2">Currently Out of Stock</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedBook.description}</p>
                </div>

                <div className="flex gap-3">
                  {(selectedBook.format === 'PDF' || selectedBook.format === 'Both') && (
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => {
                        addToCart(selectedBook, 'PDF');
                        setSelectedBook(null);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add PDF to Cart
                    </Button>
                  )}
                  {(selectedBook.format === 'Physical' || selectedBook.format === 'Both') && (
                    <Button
                      variant="outline"
                      className="flex-1"
                      disabled={!selectedBook.inStock}
                      onClick={() => {
                        addToCart(selectedBook, 'Physical');
                        setSelectedBook(null);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add Physical Copy
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Checkout
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="rounded-xl bg-secondary/50 p-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-medium">{formatPrice(0)}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              This is a UI demo. No actual payment will be processed.
            </p>
            <Button variant="gradient" className="w-full" size="lg" onClick={handleCheckout}>
              Complete Purchase
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Complete Modal */}
      <Dialog open={orderComplete} onOpenChange={setOrderComplete}>
        <DialogContent className="max-w-sm text-center">
          <div className="flex flex-col items-center py-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Order Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Your order has been placed successfully. Check your email for details.
            </p>
            <Button variant="default" onClick={() => setOrderComplete(false)}>
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LibraryPage;
