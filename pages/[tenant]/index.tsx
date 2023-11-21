import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/Home.module.css";

function TenantPage() {
  const router = useRouter();
  const { tenant } = router.query;

  return (
    <div>
      <h1>Página do Inquilino: {tenant}</h1>
      <p>Bem-vindo à página exclusiva do inquilino {tenant}!</p>
    </div>
  );
}

export default TenantPage;
