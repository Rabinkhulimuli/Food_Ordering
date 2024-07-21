export default function Footer(){
    return(
        <>
            <div className="flex flex-col md:flex-row md:justify-between items-center p-4 bg-orange-700 text-white" >
                <span className="font-bold text-lg text-center " >MernsEat.com</span>
                <span className="flex gap-4 capitalize text-md font-bold text-center " >
                    <span>
                        privacy policy
                    </span>
                    <span>Terms of Services</span>
                </span>
            </div>
        </>
    )
}