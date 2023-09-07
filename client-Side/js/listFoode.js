const init = () => {
  doApi(); ///api for our localhost:3000
  declareViewEvents(); ///create event;
};
const declareViewEvents = () => {
  let form_elem = document.querySelector("#id_form"); ///get the form elem

  form_elem.addEventListener("submit", (e) => {
    e.preventDefault(); ///stop the deffulat
    // window.alert("hello from declare event");
    let objFood = {
      // must mech to the sechma in th eserver side
      name: document.querySelector("#id_name").value,
      img: document.querySelector("#id_img").value,
      cal: document.querySelector("#id_cals").value,
      price: document.querySelector("#id_price").value,
    };
    // validation of all dateil befor we send req
    if (objFood.name.lengh < 2) {
      return window.alert("short name");
    } else if (objFood.price < 1) {
      return window.alert("invalid price");
    } else if (objFood.cal < 1) {
      return window.alert("invalid cals");
    }
    console.log(objFood); ///checking
    // send api post
    doPostApi(objFood);
  });
};

const createFoodsList = (_arrFoods) => {
  document.querySelector("#id_ul").innerHTML = ``; ///reffresh
  _arrFoods.forEach((item) => {
    // each item has own li
    let li_elem = document.createElement("li");
    document.querySelector("#id_ul").append(li_elem);
    // show each prod of food
    li_elem.innerHTML += `
    <button class="my-1 mx-3 btn btn-danger del-btn">X</button>
    ${item.name} - ${item.price}
    `;
    let del_btn = li_elem.querySelector(".del-btn");
    del_btn.addEventListener("click", () => {
    //   window.alert(item._id); ///show each food his own id
      if (window.confirm("Are you sure")) {
        doApiDelete(item._id);///delete this food
      }
      else{
          return;
      }
    });
  });
};
// //////////////////////////////Api Requests - POST - GET - DELETE
const doApiDelete = async (_idDel) => {
  // diffine the id del
  let url = `http://localhost:3000/foods/${_idDel}` ;
  try {
    let resp = await axios({
      url: url,
      method: "DELETE",
    });
    console.log(resp.data);
    if (resp.data.deletedCount) {
      // the req has been seccseed
      doApi(); //again
    }
  } catch (error) {
    console.log(error);
  }
};

const doPostApi = async (_bodyFood) => {
  // post req - localhost:3000
  let url = `http://localhost:3000/foods`;
  try {
    let resp = await axios({
      url: url,
      method: "POST",
      data: _bodyFood,
    });
    console.log(resp.data);
    if (resp.data._id) {
      // the req has been seccseed
      doApi(); //again
    }
  } catch (error) {
    console.log(error);
  }
};
const doApi = async () => {
  //   window.alert("hello from api");
  let url = `http://localhost:3000/foods`;
  let rest;
  try {
    // axios request
    resp = await axios.get(url);
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
  ///call function of presnt all data
  createFoodsList(resp.data);
};

init();
