import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import Loading from "../../components/Sections/Loading";
import { fetchStudents } from "../../redux/studentsSlice";
import StudentCard from "../../components/Cards/StudentCard";
import { Student } from "../../types/students";
import HeaderTitle from "../../components/Sections/HeaderTitle";
import FormGroup from "../../components/Form/FormGroup";
import Button from "../../components/Base/Button";
import FormSelect from "../../components/Form/FormSelect";
import Hr from "../../components/Base/Hr";

const Students = () => {
  // Language
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
  const studentTypeValues = [
    { value: "all", label: t("all") },
    { value: "1", label: t("bachelor") },
    { value: "2", label: t("masterDegree") },
    { value: "3", label: t("phd") },
  ];

  const [studentType, setStudentType] = useState<string>("");
  const [institute, setInstitute] = useState<string>("");

  const [headerTitleProps] = useState<
    { content: string; marginLeft?: string; width?: string }[]
  >([
    { content: "#", marginLeft: "24px", width: "" },
    { content: "f.i.sh.", marginLeft: "50px", width: "" },
    { content: "StudentType", marginLeft: "125px", width: "150px" },
    { content: "otm", marginLeft: "18px", width: "315px" },
    { content: "AllocatedAmount", marginLeft: "20px", width: "160px" },
    { content: "ContractAmount", marginLeft: "32px", width: "" },
    { content: "Actions", marginLeft: "24px", width: "70px" },
  ]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    parseInt(searchParams.get("page_size") || "10", 10)
  );

  const dispatch = useDispatch<AppDispatch>();
  const { students, status } = useSelector(
    (state: RootState) => state.students
  );

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

  // Fetch Students
  useEffect(() => {
    dispatch(fetchStudents({ page, pageSize: itemsPerPage }));
    setItemsPerPage(parseInt(searchParams.get("page_size") || "10", 10));
  }, [searchParams, dispatch, page, itemsPerPage]);

  if (status === "loading") return <Loading />;
  if (status === "failed") return <p>{t("ErrorLoadingStudents")}</p>;

  // Pagination Values
  const total = students?.count || 1;
  const pageCount = Math.ceil(total / itemsPerPage);
  const displayedItemsCount = Math.min(page * itemsPerPage, total);

  return (
    <div className="max-w-7xl mx-auto px-10 pb-28">
      <div className="flex justify-end w-full">
        <Link
          to="/add-student"
          className="px-8 py-2 bg-blueSecondary font-SfProText text-[15px] text-white rounded-md my-7 flex items-center gap-[10px]"
        >
          <i className="icon-plus text-2xl"></i>
          {t("addStudent")}
        </Link>
      </div>
      <div className="mb-3 flex items-center">
        {headerTitleProps.map((obj, index) => {
          return <HeaderTitle config={obj} key={index} />;
        })}
      </div>
      <div className="mb-6">
        {students?.results.map((item: Student, i: number) => (
          <StudentCard
            key={item.id}
            order={(page - 1) * itemsPerPage + i + 1}
            student={item}
          />
        ))}
      </div>
      <div className="flex justify-between items-center font-normal">
        {t("ShowDetail", {
          all: total,
          first: 1 + (page - 1) * itemsPerPage,
          latest: displayedItemsCount,
        })}
        <div className="flex items-center">
          <span className="text-blackThird font-Rubik font-normal">
            {t("Show")}
          </span>
          {/* Pagination Select */}
          <FormSelect
            id="pagination-select"
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
            options={showSelect}
            selectClass="select select-sm mx-3 text-blackThird font-normal border border-[#DFE3E8]"
          />

          {/* Students Pagination */}
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

      {/* Students Filter Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn text-pinkPrimary  btn-md btn-circle  btn-ghost absolute right-3 top-3">
              <i className="icon-close text-2xl"></i>
            </button>
            <h3 className=" text-2xl">{t("filter")}</h3>
            <Hr margin="my-7" />
            <FormGroup
              id="studentType"
              label={t("StudentType")}
              parentClass="mb-7"
            >
              <FormSelect
                id="studentType"
                onChange={(e) => setStudentType(e.target.value)}
                options={studentTypeValues}
                value={studentType}
                selectClass="select select-sm bg-brownPrimary h-[44px] font-normal  text-blackThird border border-[#DFE3E8]"
              />
            </FormGroup>

            <FormGroup id="otm" label={t("OTM")} parentClass="mb-7">
              <FormSelect
                id="intitutes"
                onChange={(e) => setInstitute(e.target.value)}
                fetchOptionsUrl="/institute-list/"
                value={institute}
                selectClass="select select-sm h-[44px] bg-brownPrimary  text-blackThird font-normal border border-[#DFE3E8]"
                defaultValue="default"
              />
            </FormGroup>

            <Hr margin="my-7" />

            <div className="flex justify-end gap-4 items-center">
              <Button
                type="reset"
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

export default Students;
