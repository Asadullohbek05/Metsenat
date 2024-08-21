import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSponsors } from "../../redux/sponsorsSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { useTranslation } from "react-i18next";
import { Sponsor } from "../../types/sponsors";
import SponsorCard from "../../components/Cards/SponsorCard";
import ReactPaginate from "react-paginate";
import Loading from "../../components/Sections/Loading";
import HeaderTitle from "../../components/Sections/HeaderTitle";
import FormGroup from "../../components/Form/FormGroup";
import Check from "../../components/Form/FormCheck";
import DateRangePicker from "../../components/Form/FormDatePicker";
import Button from "../../components/Base/Button";
import FormSelect from "../../components/Form/FormSelect";
import Hr from "../../components/Base/Hr";

const SponsorsPage: React.FC = () => {
  // Translate
  const { t } = useTranslation();

  //Pagination Select Valuse
  const showSelect = [
    { value: "10", label: "10" },
    { value: "12", label: "12" },
    { value: "14", label: "14" },
    { value: "16", label: "16" },
    { value: "18", label: "18" },
    { value: "20", label: "20" },
  ];
  // Application Status Values
  const AllStatus = [
    { value: "Barchasi", label: t("all") },
    { value: "Yangi", label: t("new") },
    { value: "Moderatsiyada", label: t("inModeration") },
    { value: "Tasdiqlangan", label: t("approved") },
    { value: "Bekor qilingan", label: t("canceled") },
  ];
  // HeaderTitle Values
  const [headerTitleProps] = useState<
    { content: string; marginLeft?: string; width?: string }[]
  >([
    { content: "#", marginLeft: "24px", width: "" },
    { content: "f.i.sh.", marginLeft: "40px", width: "" },
    { content: "phoneNumber", marginLeft: "208px", width: "150px" },
    { content: "SponsorshipAmount", marginLeft: "15px", width: "170px" },
    { content: "AmountSpent", marginLeft: "", width: "160px" },
    { content: "date", marginLeft: "36px", width: "" },
    { content: "Status", marginLeft: "97px", width: "" },
    { content: "Actions", marginLeft: "65px", width: "70px" },
  ]);
  // Checkbox Values
  const [checkboxValues] = useState<{ text: string; id: string }[]>([
    { text: "Barchasi", id: "1" },
    { text: "1 000 000 UZS", id: "2" },
    { text: "5 000 000 UZS", id: "3" },
    { text: "7 000 000 UZS", id: "4" },
    { text: "10 000 000 UZS", id: "5" },
    { text: "30 000 000 UZS", id: "6" },
    { text: "50 000 000 UZS", id: "7" },
  ]);

  // Params Items
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    parseInt(searchParams.get("page_size") || "10", 10)
  );

  const [statusApplication, setStatusApplication] = useState<string>("");
  const [activeCheckbox, setActiveCheckbox] = useState<string>("1");
  const datePickerRef = useRef<{ resetDateRange: () => void }>(null);

  // Reset Filter
  const resetFilter = () => {
    setStatusApplication("");
    setActiveCheckbox("1");
    datePickerRef.current?.resetDateRange();
  };

  // Fetch Sponsors
  const dispatch = useDispatch<AppDispatch>();
  const { sponsors, status } = useSelector(
    (state: RootState) => state.sponsors
  );
  useEffect(() => {
    dispatch(fetchSponsors({ page, pageSize: itemsPerPage }));
    setItemsPerPage(parseInt(searchParams.get("page_size") || "10", 10));
  }, [dispatch, page, itemsPerPage, searchParams]);

  // Pagination Buttons Handling
  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    setSearchParams({
      page: newPage.toString(),
      page_size: itemsPerPage.toString(),
    });
  };

  // Pagination Page Items Handling
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setSearchParams({ page: "1", page_size: newItemsPerPage.toString() });
  };
  const total = sponsors?.count || 1;
  const pageCount = Math.ceil(total / itemsPerPage);
  const displayedItemsCount = Math.min(page * itemsPerPage, total);

  // Handle Checkbox Values
  const handleCheckboxClick = (id: string) => {
    setActiveCheckbox(id);
  };

  // Loading and Errors
  if (status === "loading") return <Loading />;
  if (status === "failed") return <p>{t("ErrorLoadingSponsors")}</p>;

  return (
    <div className="max-w-7xl mx-auto px-10 mt-12 pb-28">
      {/* Sponsors Header */}
      <div className="mb-3 flex items-center">
        {headerTitleProps.map((obj, index) => (
          <HeaderTitle key={index} config={obj} />
        ))}
      </div>

      {/* Sponsors Body */}
      <div className="mb-6">
        {sponsors?.results.map((item: Sponsor, i: number) => (
          <SponsorCard
            key={item.id}
            order={(page - 1) * itemsPerPage + i + 1}
            sponsor={item}
          />
        ))}
      </div>

      {/* Sponsors Footer */}
      <div className="flex justify-between items-center font-normal text-[15px]">
        {t("ShowDetail", {
          all: total,
          first: 1 + (page - 1) * itemsPerPage,
          latest: displayedItemsCount,
        })}
        <div className="flex items-center">
          <span className="text-blackThird  font-normal">{t("Show")}</span>
          {/* Pagination Select */}
          <FormSelect
            id="pagination-select"
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
            options={showSelect}
            selectClass="select select-sm mx-3 text-blackThird font-normal border border-[#DFE3E8]"
          />
          {/* Pagination */}
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

      {/* Filter Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn text-pinkPrimary btn-md btn-circle btn-ghost absolute right-3 top-3">
              <i className="icon-close text-2xl"></i>
            </button>
            <h3 className="text-2xl text-blackPrimary">{t("filter")}</h3>
            <Hr margin="my-6" />
            <FormGroup
              id="action"
              label={t("applicationStatus")}
              parentClass="mb-7"
            >
              <FormSelect
                id="status"
                onChange={(e) => setStatusApplication(e.target.value)}
                value={statusApplication}
                options={AllStatus}
                selectClass="select select-sm bg-brownPrimary h-[42px] font-normal text-blackThird border border-[#DFE3E8]"
              />
            </FormGroup>
            <FormGroup
              id="sponsorshipAmount"
              label={t("SponsorshipAmount")}
              parentClass="mb-3"
            >
              <div className="flex flex-wrap items-center">
                {checkboxValues.map((checkbox) => (
                  <Check
                    key={checkbox.id}
                    text={checkbox.text}
                    id={checkbox.id}
                    isActive={checkbox.id === activeCheckbox}
                    onClick={() => handleCheckboxClick(checkbox.id)}
                  />
                ))}
              </div>
            </FormGroup>
            <FormGroup id="date" label={t("date")}>
              <DateRangePicker ref={datePickerRef} />
            </FormGroup>
            <Hr margin="my-6" />
            <div className="flex justify-end gap-4 items-center">
              <Button
                type="button"
                onClick={resetFilter}
                variant="outline"
                text={t("clean")}
                iconLeft={true}
                icon="icon-clean text-2xl"
                customClass="h-[42px] px-8 gap-[10px] text-blueSecondary border border-blueSecondary"
              />
              <Button
                type="submit"
                variant="primary"
                text={t("SeeResults")}
                iconLeft={true}
                icon="icon-eye2 text-2xl"
                customClass="h-[42px] px-8 gap-[10px]"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SponsorsPage;
