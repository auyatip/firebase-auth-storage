"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth } from "../../../services/firebase";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { db } from "../../../services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
  });
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    let q: any = collection(db, "products");

    if (search) {
      // หากค้นหาจากชื่อ (name)

      q = query(
        collection(db, "products"),
        where("name", ">=", search),
        where("name", "<=", search + "\uf8ff")
      );

      q = query(collection(db, "products"), where("id", "==", `${search}`));

      const price = parseFloat(search);
      if (!isNaN(price)) {
        q = query(collection(db, "products"), where("price", "==", price));
      }
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const ProductCard = ({ product }: { product: any }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-4">รหัสสินค้า: {product.id}</p>
      <p className="text-gray-700 mb-4">ราคา: ${product.price}</p>
      <div className="flex gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => alert(`Added ${product.name} to cart!`)}
        >
          Add to Cart
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => handleDeleteProduct(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const ProductList = () => (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product: any, index: any) => (
        <ProductCard product={product} key={index} />
      ))}
    </div>
  );

  // Add Product
  const handleAddProduct = async () => {
    if (!form.id || !form.name || !form.price) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const q = query(collection(db, "products"), where("id", "==", form.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("รหัสสินค้านี้มีอยู่แล้ว กรุณาใช้รหัสสินค้าใหม่");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        id: `ID${form.id}`,
        name: form.name,
        price: parseFloat(form.price),
      });
      alert("เพิ่มสินค้าเรียบร้อยแล้ว");
      setOpen(false);
      fetchProducts();
      setForm({
        id: "",
        name: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const onClose = () => {
    setOpen(false);
    setForm({
      id: "",
      name: "",
      price: "",
    });
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    const productDocRef = doc(db, "products", id);

    try {
      await deleteDoc(productDocRef);
      console.log("Deleting document with ID:", id);
      alert("ลบสินค้าเรียบร้อยแล้ว");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <div>
          {/* Search Bar */}
          <TextField
            label="ค้นหา"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ margin: "20px 0", width: "100%" }}
          />
          <div
            aria-hidden="true"
            className="w-full flex items-center justify-center"
          >
            <button
              onClick={() => setOpen(true)}
              className="bg-green-700 hover:bg-green-900 w-1/3  text-white px-4 py-3 shadow-lg  rounded"
            >
              เพิ่มสินค้า
            </button>
          </div>
          {/* Product List */}
          <ProductList />

          {/* Dialog */}
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>เพิ่มสินค้าใหม่</DialogTitle>
            <DialogContent>
              <TextField
                label="รหัสสินค้า"
                variant="outlined"
                fullWidth
                margin="normal"
                value={`ID${form.id}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/^ID/, "");
                  setForm({ ...form, id: value });
                }}
              />
              <TextField
                label="ชื่อสินค้า"
                variant="outlined"
                fullWidth
                margin="normal"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <TextField
                label="ราคา"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={handleAddProduct}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>Redirecting to login...</div>
      )}
    </>
  );
};

export default Menu;
