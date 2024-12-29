import { appleImg, bagImg, searchImg } from "../utils"
import { navLists } from "../constants"


export const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full py-5 sm:px-10 px-5">

        <nav className="flex w-full screen-max-width">

            <img src={appleImg} alt="Apple" width={14} height={18} />

            <div className="flex-1 flex justify-center max-sm:hidden">
                {navLists.map( (item, i) => (
                    <div key={i} className="text-sm px-5 cursor-pointer text-gray hover:text-white transition-colors">
                        {item}
                    </div>
                ) )}
            </div>

            <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                <img src={searchImg} alt="search" width={18} height={18}/>
                <img src={bagImg} alt="bag" width={18} height={18} />
            </div>

        </nav>

    </header>
  )
}
