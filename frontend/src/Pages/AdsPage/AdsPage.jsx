// CSS
import "./AdsPage.css";

import { uploads } from "../../utils/config";

// Components

// Hooks
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getAdsDetails } from "../../Slice/adsSlice";

const AdsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { ads, add, loading, error, message } = useSelector(
    (state) => state.ads
  );

  // Load ads data
  useEffect(() => {
    dispatch(getAdsDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        ads && (
          <div>
            {ads.images &&
              ads.images.map((image, index) => (
                <img
                  key={index}
                  src={`${uploads}/ads/${image}`}
                  alt={`${ads.title} - Foto ${index + 1}`}
                />
              ))}
            <p>Título: {ads.title}</p>
            <p>Tipo de Imóvel: {ads.typeOfRealty}</p>
            <p>Descrição: {ads.description}</p>
            <p>Preço: {ads.price}</p>
            <p>Endereço: {ads.address}</p>
            <p>Bairro: {ads.district}</p>
            <p>Cidade: {ads.city}</p>
            <p>Método de Venda: {ads.methodOfSale}</p>
            <p>Medição do Terreno: {ads.landMeasurement}</p>
            <p>Telefone: {ads.tell}</p>
            <p>WhatsApp: {ads.whatsapp}</p>
          </div>
        )
      )}
    </div>
  );
};

export default AdsPage;
