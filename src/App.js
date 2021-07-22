import './App.css';
import Header from './Header';
import PostComment from './PostComment';
import CommentsContainer from './CommentsContainer';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <PostComment/>
      <CommentsContainer/>
    </div>
  );
}

export default App;
