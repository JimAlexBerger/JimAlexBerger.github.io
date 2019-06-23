//fetch JSON
fetch("projects.json").then(response => response.json()).then(json => processJson(json));

//Add eventlistener to all sort options
Array.prototype.forEach.call(document.getElementsByClassName("sortOption"), (el) => {
    el.addEventListener("click", function() {
        sortProjects(this.innerHTML);
    })
})



//function wich processes and displays json as elements
var processJson = json => {
    //DISPLAY
    var categories = [];
    json.projects.forEach(project => {
        addProject(project.name, project.description, project.link, project.img, project.category, project.date);
        if (!categories.includes(project.category)) {
            categories.push(project.category);
        }
    })
    addCategorySelector(categories);

    //default sort
    sortProjects("Dato nyeste")
}

var addProject = (name, description, href, thumb, category, date) => {
    var largeW = 4;
    var mediumW = 6;
    var smallW = 12;
    var xSmallW = 12;

    var parent = document.getElementById("projectsDiv");

    var div = document.createElement("DIV");
    div.className = "col-lg-" + largeW + " col-md-" + mediumW + " col-sm-" + smallW + " col-xs-" + xSmallW + " project";
    div.setAttribute("data-name", name);
    div.setAttribute("data-date", date);
    if (category !== null) {
        div.className += " " + category;
    }

    var link = document.createElement("A");
    link.className = "thumbnail";
    link.href = href;

    /*var thumbnail = document.createElement("DIV");
    thumbnail.className = "thumbnail";*/

    var img = document.createElement("IMG");
    img.src = thumb;
    img.alt = name;

    var caption = document.createElement("DIV");
    caption.className = "caption";

    var header = document.createElement("H3");
    header.innerHTML = name;

    var desc = document.createElement("P");
    desc.innerHTML = description;

    var dateDiv = document.createElement("P");
    dateDiv.style = "font-size: 70%;";
    dateDiv.innerHTML = "Sist Redigert: " + date;

    caption.appendChild(header);
    caption.appendChild(desc);
    caption.appendChild(dateDiv);
    link.appendChild(img);
    link.appendChild(caption);
    //link.appendChild(thumbnail);
    div.appendChild(link);
    parent.appendChild(div);
}

//takes in list firs time json is prosessed and displays them as options to toggle show/hide
var addCategorySelector = (categories) => {
    var parent = document.getElementById("groupSelect");
    var btn = document.createElement("BUTTON");
    btn.type = "button"
    btn.className = "btn btn-default";
    btn.innerHTML = "Alle";
    btn.addEventListener("click", function() {
        $(".project").show();
        console.log(this.innerHTML);
    });
    parent.appendChild(btn);
    categories.forEach(string => {
        if (string !== null) {
            var btn = document.createElement("BUTTON");
            btn.type = "button";
            btn.className = "btn btn-default";
            btn.innerHTML = string;
            btn.addEventListener("click", function() {
                $(".project").hide();
                $("." + this.innerHTML).show();
                console.log(this.innerHTML);
            });
            parent.appendChild(btn);
        }
    })
}

var sortProjects = (sortOption) => {
    switch (sortOption) {
        case "A - Å":
            var $wrapper = $('#projectsDiv'),
                $articles = $wrapper.find('.project');
            [].sort.call($articles, function(a, b) {
                return $(a).attr('data-name').localeCompare($(b).attr('data-name'));
            });
            $articles.each(function() {
                $wrapper.append(this);
            });
            break;
        case "Å - A":
            var $wrapper = $('#projectsDiv'),
                $articles = $wrapper.find('.project');
            [].sort.call($articles, function(a, b) {
                return $(b).attr('data-name').localeCompare($(a).attr('data-name'));
            });
            $articles.each(function() {
                $wrapper.append(this);
            });
            break;
        case "Dato nyeste":
            var $wrapper = $('#projectsDiv'),
                $articles = $wrapper.find('.project');
            [].sort.call($articles, function(a, b) {
              var aDate = new Date($(a).attr('data-date'));
              var bDate = new Date($(b).attr('data-date'));
                return bDate.getTime() - aDate.getTime();
            });
            $articles.each(function() {
                $wrapper.append(this);
            });
            break;
        case "Dato eldste":
            var $wrapper = $('#projectsDiv'),
                $articles = $wrapper.find('.project');
            [].sort.call($articles, function(a, b) {
              var aDate = new Date($(a).attr('data-date'));
              var bDate = new Date($(b).attr('data-date'));
                return aDate.getTime() - bDate.getTime();
            });
            $articles.each(function() {
                $wrapper.append(this);
            });
            break;
        default:
            console.log("sort option has no code")
            break;
    }
}
