import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SponsorCard from "../../components/Cards/SponsorCard";
import ReactPaginate from "react-paginate";
import { fetchSponsors } from "../../redux/sponsorsSlice";
import { RootState, AppDispatch } from "../../redux/store";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import { Sponsor } from "../../types/sponsors";

const SponsorsPage: React.FC = () => {
  const [showSelect] = useState<string[]>(["10", "12", "14", "16", "18", "20"]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    parseInt(searchParams.get("page_size") || "10", 10)
  );

  const dispatch = useDispatch<AppDispatch>();
  const { sponsors, status } = useSelector(
    (state: RootState) => state.sponsors
  );

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      const { locale } = JSON.parse(storedLang);
      i18n.changeLanguage(locale);
    }
    dispatch(fetchSponsors({ page, pageSize: itemsPerPage }));
    setItemsPerPage(parseInt(searchParams.get("page_size") || "10", 10));
  }, [dispatch, page, itemsPerPage, searchParams, i18n]);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    setSearchParams({
      page: newPage.toString(),
      page_size: itemsPerPage.toString(),
    });
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setSearchParams({ page: "1", page_size: newItemsPerPage.toString() });
  };

  if (status === "loading") return <Loading />;
  if (status === "failed") return <p>{t("ErrorLoadingSponsors")}</p>;

  const total = sponsors?.count || 0;
  const pageCount = Math.ceil(total / itemsPerPage);
  const displayedItemsCount = Math.min(page * itemsPerPage, total);

  return (
    <div className="max-w-7xl mx-auto px-10 mt-12 pb-28">
      <div className="mb-3 flex items-center">
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-6">
          #
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[50px]">
          f.i.sh.
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[212px] w-[150px] text-center">
          {t("phoneNumber")}
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[15px] w-[170px] text-center">
          {t("SponsorshipAmount")}
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs w-[160px] text-center">
          {t("AmountSpent")}
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-9">
          {t("date")}
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[95px]">
          {t("Status")}
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[65px] w-[70px] text-center">
          {t("Actions")}
        </span>
      </div>
      <div className="mb-6">
        {sponsors?.results.map((item: Sponsor, i: number) => (
          <SponsorCard
            key={item.id}
            order={(page - 1) * itemsPerPage + i + 1}
            sponsor={item}
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
            {showSelect.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<i className="icon-arrow-right text-xs"></i>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel={<i className="icon-arrow-left text-xs"></i>}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={page - 1}
          />
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn text-[#B2B7C1]  btn-md btn-circle  btn-ghost absolute right-3 top-3">
              <i className="icon-close text-2xl"></i>
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

export default SponsorsPage;
