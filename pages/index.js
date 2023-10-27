// import Featured from "@/components/Featured";
// import Header from "@/components/Header";
// import NewProducts from "@/components/NewProducts";
// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";
// import { WishedProduct } from "@/models/WishedProduct";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]";

// export default function Home({
//   featuredProduct,
//   newProducts,
//   wishedNewProducts,
// }) {
//   return (
//     <div>
//       <Header />
//       <Featured product={featuredProduct} />
//       <NewProducts products={newProducts} WishedProducts={wishedNewProducts} />
//     </div>
//   );
// }

// export async function getServerSideProps(ctx) {
//   const featuredProductId = "64873c1c759b590c2047f65f";
//   await mongooseConnect();
//   const featuredProduct = await Product.findById(featuredProductId);
//   const newProducts = await Product.find({}, null, {
//     sort: { " _id": -1 },
//     limit: 10,
//   });

//   const session = await getServerSession(ctx.req, ctx.res, authOptions);
//   console.log({ newProducts });
//   const wishedNewProducts = session?.user
//     ? await WishedProduct.find({
//         userEmail: session.user.email,
//         product: newProducts.map((p) => p._id.toString()),
//       })
//     : [];
//   console.log({ wishedNewProducts });
//   return {
//     props: {
//       featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
//       newProducts: JSON.parse(JSON.stringify(newProducts)),
//       wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
//     },
//   };
// }

import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { Setting } from "@/models/Setting";

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProducts,
}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  // const featuredProductSetting = await Setting.findOne({
  //   name: "featuredProductId",
  // });
  // const featuredProductId = featuredProductSetting.value;
  // const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];
  return {
    props: {
      // featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  };
}

