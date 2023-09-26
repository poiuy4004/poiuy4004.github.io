



function Home(){
  return(
    <main className="container">
      <div className="content">
        <div className="post">
          <div class="cover-img">
            <img src="https://jekyll-podcaster.netlify.app//assets/img/Podcast_Cover_Small.jpg" alt="Podcast Cover" />
          </div>
          <div class="title">
            <h2 id="post-title"><a href="https://jekyll-podcaster.netlify.app//example-1">A random main episode</a></h2>
            <div class="info">
              <span>
                <i class="far fa-calendar" aria-hidden="true"></i> 17 Novembre 2019
                {/* Whitespace added for readability */}
                <span> - </span>
                <i class="far fa-clock"></i> 52:14
              </span>
            </div>
          </div>
          <div className="player-container">
          </div>
          <div class="long-excerpt">
            <p> Description goes here
              <span class="continue-reading">
                <a href="https://jekyll-podcaster.netlify.app//example-1">Continue</a>
              </span>
            </p>
          </div>
          <div class="short-excerpt">
            <p> Description goes here
              <span class="continue-reading">
                <a href="https://jekyll-podcaster.netlify.app//example-1">Continue</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Home;