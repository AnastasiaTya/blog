import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import styles from './Loader.module.scss'

const Loader = () => (
  <div className={styles.loaderContainer}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </div>
)

export default Loader
