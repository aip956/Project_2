# Project_2
Heroku deployment
https://dashboard.heroku.com/apps/herappy
https://herappy.herokuapp.com/

https://www.youtube.com/watch?v=NXtz59SJYfM
<div class = "cards" >
<div class="card">
<h2>Title</h2>
<p>This is an article and it has some content</p>
</div>

<div class="card"><h2>Title</h2>
<p>This is an article and it has some content</p>
</div>

<div class="card"><h2>Title</h2>
<p>This is an article and it has some content</p>
</div>

<div class="card"><h2>Title</h2>
<p>This is an article and it has some content</p>
</div>

<div class="card"><h2>Title</h2>
<p>This is an article and it has some content</p>
</div>

</div>

css:
body {
    background: #777;
    height: 100vh;
    margin: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
}

.cards {
    display: flex;
    flex-wrap: wrap;
}

.card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 4px 4px 15px 2px rgba(black, 0.75); 
    transition: 0.2s; 
}

.card:not(:first-child) {
    margin-left: -4rem;

}

.card:hover {
    transform: translateY(-1rem);
}

<!-- Adjacent sibling selector -->
.card: hover {
    ~ .card {
        background: red;
        transform: translateX(4rem);
    }
}