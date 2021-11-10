import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onClick }) => {
    return (
        <li className="ImageGalleryItem">
            <img
                src={image}
                alt=""
                className="ImageGalleryItemImage"
                onClick={onClick}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
    bigImage: PropTypes.func,
};

export default ImageGalleryItem;