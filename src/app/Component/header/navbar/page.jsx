
const NavBar = () => {



    return (
        <div className="bg-orange-600 border-b-2 border-t-2 border-[#0000003e]">
        <div className="xl:mx-[240px] lg:mx-[150px] md:mx-[50px] mx-[10px] text-white">
           <div className="xl:flex lg:flex xl:justify-center lg:justify-center flex-wrap justify-items-center  w-full p-5 font-semibold xl:space-x-10 lg:space-x-10">
             <div className="hover:text-[#ddd]"><a href="/">Video Downloader</a></div>
             <div className="hover:text-[#ddd]"><a href="/audiodownLoader">Audio DownLoader</a></div>
              <div className="hover:text-[#ddd]"><a href="">Facebook DownLoader</a></div>
              <div className="hover:text-[#ddd]"><a href="/about">About</a></div>
           </div>
        </div>
    </div>
    );
};

export default NavBar;