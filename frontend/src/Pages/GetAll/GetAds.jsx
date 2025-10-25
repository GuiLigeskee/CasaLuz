import "./GetAll.css";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import AdsItem from "../../Components/Ads/AdsItem";
import Filter from "../../Components/Filters/Filters";
import Loading from "../../Components/Loading/Loading";

// Redux
import { getAdsFilters, resetAds } from "../../Slice/adsSlice";

const GetAds = () => {
  const dispatch = useDispatch();
  const { ads, loading, error, pagination } = useSelector((state) => state.ads);

  const [filters, setFilters] = useState({
    keyword: "",
    typeOfRealty: "",
    methodOfSale: "",
    city: "",
    district: "",
    minPrice: "",
    maxPrice: "",
    minSpace: "",
    maxSpace: "",
    bedrooms: "",
    bathrooms: "",
    carVacancies: "",
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    dispatch(getAdsFilters(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    const cleanedFilters = { ...newFilters, page: 1, limit: 10 };

    if (cleanedFilters.minPrice) {
      cleanedFilters.minPrice = parseFloat(
        cleanedFilters.minPrice.replace(/[^\d,]/g, "").replace(",", ".")
      );
    }

    if (cleanedFilters.maxPrice) {
      cleanedFilters.maxPrice = parseFloat(
        cleanedFilters.maxPrice.replace(/[^\d,]/g, "").replace(",", ".")
      );
    }

    setFilters(cleanedFilters);
    dispatch(resetAds());
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(
      1,
      pagination.currentPage - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxPagesToShow - 1
    );

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(1)}
          disabled={!pagination.hasPrev}
        >
          &laquo;
        </button>
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(pagination.prevPage)}
          disabled={!pagination.hasPrev}
        >
          Anterior
        </button>

        {startPage > 1 && (
          <>
            <button
              className="pagination-number"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-number ${
              page === pagination.currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        {endPage < pagination.totalPages && (
          <>
            {endPage < pagination.totalPages - 1 && (
              <span className="pagination-ellipsis">...</span>
            )}
            <button
              className="pagination-number"
              onClick={() => handlePageChange(pagination.totalPages)}
            >
              {pagination.totalPages}
            </button>
          </>
        )}

        <button
          className="pagination-btn"
          onClick={() => handlePageChange(pagination.nextPage)}
          disabled={!pagination.hasNext}
        >
          Próxima
        </button>
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(pagination.totalPages)}
          disabled={!pagination.hasNext}
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="getAds">
      <h1 id="title">
        Veja <span>todos</span> os nossos anúncios!
      </h1>
      <Filter filters={filters} onFilterChange={handleFilterChange} />

      {pagination && pagination.totalItems > 0 && (
        <div className="results-info">
          <p>
            Mostrando{" "}
            {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} -{" "}
            {Math.min(
              pagination.currentPage * pagination.itemsPerPage,
              pagination.totalItems
            )}{" "}
            de {pagination.totalItems} anúncios
          </p>
        </div>
      )}

      {loading && <Loading />}
      {error && <p className="error-message">{error}</p>}

      {ads && ads.length > 0 ? (
        <>
          <div className="ads-content">
            {ads.map((add) => (
              <div key={add._id}>
                <AdsItem add={add} />
              </div>
            ))}
          </div>
          {renderPagination()}
        </>
      ) : (
        !loading && <h3 className="no-results">Nenhum anúncio encontrado :(</h3>
      )}
    </div>
  );
};

export default GetAds;
