import React from 'react';

const BookCard = ({ book, onSelect, onCancel }) => {
  const { id, title, writer, cover_image, point, tags, selected } = book;
  const parsedTags = JSON.parse(tags);
  const formattedTags = Array.isArray(parsedTags) ? parsedTags.join(', ') : parsedTags;

  const handleSelect = () => {
    if (selected) {
      onCancel(id);
    } else {
      onSelect(id);
    }
  };

  return (
    <div className={`card mb-3 ${selected ? 'border-primary' : ''}`}>
        <div className="d-flex justify-content-center">
            <img src={cover_image} className="card-img-top img-thumbnail" alt={title} style={{ maxWidth: '150px' }} />
        </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text mb-0">Writer: {writer}</p>
          <p className="card-text mb-0">Price: ${point}</p>
        </div>
        <p className="card-text">Tags: {formattedTags}</p>
        <div className="row">
          <div className="col-12">
            <button onClick={handleSelect} className={`btn btn-${selected ? 'danger' : 'primary'} w-100`}>
              {selected ? 'Cancel' : 'Select Product'}
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default BookCard;
