import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Idea from './common/Idea';
import SideNav from './common/SideNav';
import { fetchUserIdeas } from '../actions/ideaActions';

class UserIdeas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: this.props.ideas,
    };
  }

  componentDidMount() {
    this.props.fetchUserIdeas();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ideas: nextProps.ideas,
    });
  }

  render() {
    const { ideas } = this.state;
    return (
      <div >
        <div className="row">
          <div className="col m3 s12 l3">
            <SideNav className="black white-text" />
          </div>
          <div className="col m7 s12 l7 ideaDashboard">
            <h5>My Ideas</h5>
            <div id="card-container" className="row">
              { (!ideas || ideas.length < 1) &&
              <span> You have no ideas man </span>
            }
              {ideas &&
                ideas.map(idea => (
                  <Idea
                    key={idea.id}
                    id={idea.id}
                    title={idea.title}
                    category={idea.category}
                    description={idea.description}
                    status={idea.status}
                    dueby={idea.dueby}
                    author={idea.author}
                    modified={idea.modified}
                    editIdea
                    deleteIdea
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserIdeas.propTypes = {
  fetchUserIdeas: PropTypes.func.isRequired,
  ideas: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  ideas: state.userIdeasReducer
});

export default connect(mapStateToProps, { fetchUserIdeas })(UserIdeas);