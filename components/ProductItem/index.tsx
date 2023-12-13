import { Product } from "@/types/Product";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/contexts/AppContext";

type Props = {
  data: Product;
};

export const ProductItem = ({ data }: Props) => {
  const { tenant } = useAppContext();
  return (
    <Link href={`/${tenant?.slug}/product/${data.id}`}>
      <div className="container">
        <div
          className={styles.head}
          style={{ backgroundColor: tenant?.secondColor }}
        ></div>

        <div className={styles.info}>
          <div className={styles.img}>
            <Image src={data.image} alt={data.name} width={100} height={100} />
          </div>

          <div className={styles.catName}>{data.categoryName}</div>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.price} style={{ color: tenant?.mainColor }}>
            R$ {data.price.toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
