import * as React from "react"
import { Loader2 } from "lucide-react"

import styles from "./styles.module.css"

interface LoadingIconProps {
  className?: string
}

export const LoadingIcon = (props: LoadingIconProps) => {
  const { className, ...rest } = props
  return <Loader2 className={styles.loadingIcon} {...rest} />
}
