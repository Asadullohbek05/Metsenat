import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import Loading from "../../components/Loading";
import { fetchStudents } from "../../redux/studentsSlice";
import StudentCard from "../../components/StudentCard";

const Students = () => {
  const [showSelect] = useState(["10", "12", "14", "16", "18", "20"]);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      const { locale } = JSON.parse(storedLang);
      i18n.changeLanguage(locale);
    }
  }, [i18n]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    parseInt(searchParams.get("page_size") || "10", 10)
  );

  const dispatch = useDispatch<AppDispatch>();
  const { students, status } = useSelector(
    (state: RootState) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents({ page, pageSize: itemsPerPage }));
  }, [dispatch, page, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    setSearchParams({ page: newPage, page_size: itemsPerPage });
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setSearchParams({ page: 1, page_size: newItemsPerPage });
  };

  useEffect(() => {
    setItemsPerPage(parseInt(searchParams.get("page_size") || "10", 10));
  }, [searchParams]);

  if (status === "loading") return <Loading />;
  if (status === "failed") return <p>Error loading students</p>;

  const total = students?.count || 0;
  const pageCount = Math.ceil(total / itemsPerPage);
  const displayedItemsCount = Math.min(page * itemsPerPage, total);

  return (
    <div className="max-w-7xl mx-auto px-10 pb-28">
      <div className="flex justify-end w-full">
        <Link
          to="/add-student"
          className="px-8 py-2 bg-[#3366FF] text-white rounded-md my-7 flex items-center gap-[10px]"
        >
          <i className="icon-plus text-2xl"></i>
          {t("addStudent")}
        </Link>
      </div>
      <div className="mb-3 flex items-center">
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-6">
          #
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[50px]">
          f.i.sh.
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[130px] w-[150px] text-center">
          {t("StudentType")}
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[18px] w-[315px] text-center">
          {t("otm")}
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase ml-5 text-xs w-[160px] text-center">
          {t("AllocatedAmount")}
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-8  text-center">
          {t("ContractAmount")}
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-6 w-[70px] text-center">
          {t("Actions")}
        </span>
      </div>
      <div className="mb-6">
        {students?.results.map((item, i) => (
          <StudentCard
            key={item.id}
            order={(page - 1) * itemsPerPage + i + 1}
            student={item}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        {t("ShowDetail", {
          all: total,
          first: 1 + (page - 1) * itemsPerPage,
          latest: displayedItemsCount,
        })}
        <div className="flex items-center">
          <span className="text-[#1D1D1F] font-Rubik font-normal">
            {t("Show")}
          </span>
          <select
            className="select select-sm mx-3 text-[#1D1D1F] font-SfProDisplay border border-[#DFE3E8]"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {showSelect.map((option, i) => {
              return (
                <option key={i} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<i className="icon-arrow-right text-xs"></i>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel={<i className="icon-arrow-left text-xs "></i>}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={page - 1}
          />
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-SfProDisplay text-2xl">Filter</h3>
            <hr className="my-7" />
            <h1 className="text-3xl">Coming Soon...</h1>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Students;
