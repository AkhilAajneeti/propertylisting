import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "../redux/slices/gallerySlice";
import Loader from "../components/Loader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CompanyStory = () => {
  const dispatch = useDispatch();
  const {
    data: gallery,
    loading,
    error,
  } = useSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="StorySection py-5">
      <h1 className="split2 text-center">Be Part of Our Story</h1>
      <p className="text-center mt-2">Create memories that inspire...</p>

      <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <PhotoProvider>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
              modules={[Autoplay]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper-2 py-3"
            >
              {gallery.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="card shadow-sm rounded-5">
                    <PhotoView src={item.image}>
                      <img
                        src={item.image}
                        alt={item.caption}
                        loading="lazy"
                        decoding="async"
                        style={{
                          borderRadius: "10px",
                          height: "400px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </PhotoView>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </PhotoProvider>
        </div>
      </div>
    </div>
  );
};

export default CompanyStory;
