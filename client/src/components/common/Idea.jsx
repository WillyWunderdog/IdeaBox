import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

const Idea = ({
  category,
  status,
  id,
  dueby,
  title,
  modified,
  description,
  author,
  editIdea,
  deleteIdea,
}) => (
  <div className="col s12 m12 l6 card-tag" key={id}>
    <Link
      to={`/idea/${id}`}
    >
      <div className="card ">
        <div className="card-content">
          <div className="card-profile-header">
            {status === 'public' &&
            <Link className="black-text">
              <i className="material-icons right"> lock_open
              </i>
            </Link>
          }
            {status === 'private' &&
            <Link className="black-text">
              <i className="material-icons right"> lock
              </i>
            </Link>
          }
            <div className="card-profile-name">
              <h6 className="card-title">{title}</h6>

            </div>
          </div>
          <span className="dateCreated">
            Execution Date: {moment(dueby).format('DD/MM/YY')}
          </span>
          <p>
            {description.substr(0, 30)}
            <span className="edited-card-text">
              {modified === true ? '[..edited]' : ' '}
            </span>
          </p>
        </div>
        <div className="card-action">
          { !editIdea &&
          <span className="author">
            {author.username}
          </span>
      }
          { editIdea &&
          <span>
            <Link to={`/idea/${id}/edit`}>
              <i className="material-icons">edit</i>
            </Link>
          </span>
      }
          { deleteIdea &&
          <span>
            <Link to={`/idea/${id}/delete`}>
              <i className="material-icons">delete</i>
            </Link>
          </span>
      }
          <span
            className="new badge green ideaCategory"
            data-badge-caption={category}
          />
        </div>
      </div>
    </Link>
  </div>
);

Idea.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  modified: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  dueby: PropTypes.number.isRequired,
  author: PropTypes.objectOf(PropTypes.any).isRequired,
  editIdea: PropTypes.bool.isRequired,
  deleteIdea: PropTypes.bool.isRequired
};

export default Idea;
