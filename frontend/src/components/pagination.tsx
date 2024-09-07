type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};
export default function Pagination({ page, pages, onPageChange }: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
    <div className=" flex items-center shadow-xl bg-orange-200 justify-center" >
    <div>
        {page !== 1 && (
          <button
            onClick={() => onPageChange(page - 1)}
            className=" tracking-tight mx-1 hover:bg-orange-500 rounded"
          >
            {"<<"}Prev{" "}
          </button>
        )}
        {pageNumbers.length !== 0 &&
          pageNumbers.map((number) => (
            <button
            key={number}
              disabled={page === number ? true : false}
              onClick={() => onPageChange(number)}
              className={` px-2 bg-orange-200 hover:bg-orange-500 rounded font-semibold aspect-square ${page==number? "text-white bg-orange-500":""}`}
            >
              {number}
            </button>
          ))}
        {page !== pageNumbers.length && (
          <button onClick={() => onPageChange(page + 1)}
          className=" mx-2 hover:bg-orange-500 rounded "
          >Next{">>"} </button>
        )}
      </div>
    </div>
      
    </>
  );
}
