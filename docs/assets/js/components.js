// when page load
$(document).ready(function () {
    menu()
})

function menu() {
    var menu = `<nav class="menu navbar navbar-expand-md navbar-dark fixed-top p-2"">
      <div class="container">

        <a class="navbar-brand" href="index.html"><b>
        <nav class="navbar navbar-expand-lg navbar-dark">
           <a class="navbar-brand" onclick="go_to('index.html')" href="#/"><img src="assets/images/logo.png" width="350" height="85" alt=""></img></a>
        </nav>
          </b></a>
          <button class="navbar-toggler collapsed" type="button" data-toggle="collapse"
              data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
  
          <div class="navbar-collapse collapse  justify-content-end" id="navbarsExampleDefault">
  
              <div align="right">
                  <ul class="navbar-nav mr-auto">
  
                      <li class="nav-item">
                          <a class="nav-link" href="index.html"><b>Home</b></a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="marketplace.html"><b>MarketPlace</b></a>
                      </li>

                      <li class="nav-item">
                          <a class="nav-link" href="myRobots.html"><b>My robots</b></a>
                      </li>

                      
                      <li class="nav-item">
                          <a class="nav-link" href="factory.html"><b>R-Factory</b></a>
                      </li>
  
                      <li class="nav-item">
                          <button class="btn red-btn ml-4" onclick="go_to('factory.html')">Start</button>
                      </li>
  
                  </ul>
  
              </div>
  
          </div>
      </div>
  </nav>`
    $("#menu").html(menu)
}
