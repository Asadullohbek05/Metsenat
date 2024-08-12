import { useEffect, useState } from "react";
import SponsorCard from "../components/SponsorCard";
import request from "../server/request";
import ReactPaginate from "react-paginate";
import ArrowLeft from "../components/ArrowLeft";
import ArrowRight from "../components/ArrowRight";

const SponsorsPage = () => {
  const [sponsorData, setSponsorData] = useState([]);
  const [total, setTotal] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(total / itemsPerPage);

  const getData = async (page = 1, limit = 10) => {
    try {
      const params = {
        limit,
        page,
      };
      const { data } = await request.get("/sponsor-list/", { params });
      console.log(data);
      setSponsorData(data.results);
      setTotal(data.count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageClick = async (event) => {
    const newPage = event.selected + 1;
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-10 mt-12 pb-28">
      <div className="mb-3">
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-6">
          #
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[50px]">
          f.i.sh.
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[250px]">
          Tel.Raqami
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[67px]">
          Homiylik summasi
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-8">
          Sarflangan summa
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-9">
          Sana
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[110px]">
          Holati
        </span>
        <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-[70px]">
          Amallar
        </span>
      </div>
      <div className="mb-6">
        {sponsorData.map((item, i) => (
          <SponsorCard key={item.id} order={i + 1} sponsor={item} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[#1D1D1F] font-SfProDisplay">
          {total} tadan {1 + (currentPage - 1) * itemsPerPage}
          {Math.min(currentPage * itemsPerPage, total)} ko'rsatilmoqda
        </p>
        <div className="flex items-center">
          <span className="text-[#1D1D1F] font-Rubik font-normal">
            Ko'rsatish
          </span>
          <select
            className="select select-sm mx-3 text-[#1D1D1F] font-SfProDisplay border border-[#DFE3E8]"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
          </select>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel={<ArrowLeft />}
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </div>
  );
};

export default SponsorsPage;
