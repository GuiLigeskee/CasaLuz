import "./GetAll.css";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import DepoimentItem from "../../Components/Depoiment/DepoimentItem";
import Message from "../../Components/Messages/Message";

// redux
import { getDepoiments } from "../../Slice/depoimentSlice";

const GetDepoiments = () => {
  const dispatch = useDispatch();

  const { depoiments, loading, message } = useSelector(
    (state) => state.depoiments
  );

  useEffect(() => {
    dispatch(getDepoiments());
  }, [dispatch]);

  return (
    <div className="getDepoiments">
      <h1 id="title">
        Veja <span>todos</span> os depoimentos de nossos clientes!
      </h1>
      {depoiments ? (
        <div className="depoiments-content">
          {depoiments &&
            depoiments.map((depoiment) => (
              <div key={depoiment._id}>
                <DepoimentItem depoiment={depoiment} />
              </div>
            ))}
        </div>
      ) : (
        <p>Não foi possível mostrar todos os depoimentos :(</p>
      )}
    </div>
  );
};

export default GetDepoiments;
