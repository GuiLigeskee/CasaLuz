import "./GetAll.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";
import AdsItem from "../../Components/Ads/AdsItem";
import Loading from "../../Components/Loading/Loading";
import { getAdsFilters, resetAds } from "../../Slice/adsSlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { ads, loading, error, pagination } = useSelector((state) => state.ads);
  const query = useQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isAnimationClosing, setIsAnimationClosing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = { page: currentPage, limit: 10 };

    if (query.get("keyword")) {
      params.keyword = query.get("keyword");
    }

    if (query.get("methodOfSale")) {
      params.methodOfSale = query.get("methodOfSale");
    }

    if (query.get("typeOfRealty")) {
      params.typeOfRealty = query.get("typeOfRealty");
    }

    if (Object.keys(params).length > 0) {
      dispatch(getAdsFilters(params));
    }
  }, [dispatch, query.toString(), currentPage]);

  useEffect(() => {
    if (error) {
      setErrorMessages({ error: error });
      setIsModalOpen(true);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(resetAds());
    };
  }, [dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAnimationClosing(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
    <div className="searchResults">
      <h1 id="title">
        Resultados da <span>Pesquisa</span>
      </h1>

      <ErrorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isAnimationDone={isAnimationDone}
        isAnimationClosing={isAnimationClosing}
        errors={errorMessages}
        setIsAnimationDone={setIsAnimationDone}
      />

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

      {ads && ads.length > 0 ? (
        <>
          <div className="getResults">
            {ads.map((add) => (
              <div key={add._id}>
                <AdsItem add={add} />
              </div>
            ))}
          </div>
          {renderPagination()}
        </>
      ) : (
        !loading &&
        !error && <p className="no-results">Nenhum anúncio encontrado :(</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
