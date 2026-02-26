import {Button} from '@/common/components/ui';
import { Path } from "@/common/routing"
import { Link } from "react-router"
import styles from "./PageNotFound.module.css"

export const PageNotFound = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button  className={styles.button}>
      <Link to={Path.Main}>Вернуться на главную</Link>
    </Button>
  </div>
)
