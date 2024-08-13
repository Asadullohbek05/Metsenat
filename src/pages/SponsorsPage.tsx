import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SponsorCard from "../components/SponsorCard";
import request from "../server/request";
import ReactPaginate from "react-paginate";
import ArrowLeft from "../components/ArrowLeft";
import ArrowRight from "../components/ArrowRight";
import { useQuery } from "@tanstack/react-query";

interface Sponsor {
  id: string;
  full_name: string;
  phone: string;
  sum: string;
  firm?: string;
  get_status_display: string;
}

interface SponsorsResponse {
  count: number;
  results: Sponsor[];
}

const fetchSponsors = async ({
  queryKey,
}: {
  queryKey: [string, number, number];
}): Promise<SponsorsResponse> => {
  const [, page, pageSize] = queryKey;
  try {
    const { data } = await request.get<SponsorsResponse>("/sponsor-list/", {
      params: { page_size: pageSize, page },
    });
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch sponsors");
  }
};

const SponsorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    parseInt(searchParams.get("page_size") || "10", 10)
  );

  const { data, isLoading } = useQuery({
    queryKey: ["sponsors", page, itemsPerPage],
    queryFn: fetchSponsors,
    keepPreviousData: true,
  });

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

  if (isLoading) return <p>Loading...</p>;

  const total = data?.count || 0;
  const pageCount = Math.ceil(total / itemsPerPage);
  const displayedItemsCount = Math.min(page * itemsPerPage, total);

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
        {data?.results.map((item, i) => (
          <SponsorCard
            key={item.id}
            order={(page - 1) * itemsPerPage + i + 1}
            sponsor={item}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[#1D1D1F] font-SfProDisplay">
          {total} tadan {1 + (page - 1) * itemsPerPage}-{displayedItemsCount}{" "}
          ko'rsatilmoqda
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
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
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
            <div className="mb-7">
              <label
                htmlFor=""
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                Ariza holati
              </label>
              <select
                // value={status}
                // onChange={(e) => setStatus(e.target.value)}
                className="select select-bordered  w-full mt-2 text-[#2E384D] font-SfProDisplay"
              >
                <option value="Barchasi">Barchasi</option>
                <option value="Tasdiqlangan">Tasdiqlangan</option>
                <option value="Yangi">Yangi</option>
                <option value="Taqiqlangan">Taqiqlangan</option>
                <option value="Moderatsiyada">Moderatsiyada</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                Homiylik summasi
              </label>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SponsorsPage;
