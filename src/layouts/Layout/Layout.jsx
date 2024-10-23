import { Outlet } from 'react-router'

import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

function Layout({ products, carts, setToken, role }) {
  return (
    <div>
      <Header />
      <Navbar
        products={products}
        carts={carts}
        setToken={setToken}
        role={role}
      />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
