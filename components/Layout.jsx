import Logo from './UI/Logo';

const Layout = ({ children }) =>{
  return(
    <div className="rounded grid text-center my-5 font-bold">
      <Logo/>
      { children }
    </div>
  )
}

export default Layout
