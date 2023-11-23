import { Product } from "@/types/Product";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

type Props = {
  data: Product;
  mainColor: string;
  secondColor: string;
};

const ProductItem = ({ data, mainColor, secondColor }: Props) => {
  return (
    <Link href={`/product/${data.id}`}>
      <div className="container">
        <div
          className={styles.head}
          style={{ backgroundColor: secondColor }}
        ></div>

        <div className={styles.info}>
          <div className={styles.img}>
            <Image src={data.image} alt={data.name} width={100} height={100} />
          </div>

          <div className={styles.catName}>{data.categoryName}</div>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.price} style={{ color: mainColor }}>
            {data.price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
