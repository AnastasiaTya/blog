import PrivateHeader from '../components/PrivateHeader'
import PublicHeader from '../components/PublicHeader'

const Header = ({ isAuth }) => (isAuth ? <PrivateHeader /> : <PublicHeader />)

export default Header
