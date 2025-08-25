const toFaDigits = n => (n+"").replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
    const toman = n => toFaDigits(n.toLocaleString("fa-IR")) + " تومان";

    /* ---------- داده نمونه ---------- */
    const PRODUCTS = [
      {id:1, name:"تیشرت طرح‌دار 1411",    price:2580000, oldPrice:5420000, brand:"LC Waikiki", category:"تی‌شرت", sizes:["S","M","L","XL","XXL","3XL"], colors:["#1f2937"], offer:true,  pop:95,  img:"https://images.unsplash.com/photo-1542060748-10c28b62716c?q=80&w=900&auto=format&fit=crop"},
      {id:2, name:"کفش بندی A781",         price:399000,  oldPrice:420000,  brand:"Skechers",   category:"کفش",   sizes:["40","41","42"],   colors:["#4b5563","#111827"], offer:true,  pop:88,  img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop"},
      {id:3, name:"پافر کرم 1581",         price:4000000, oldPrice:5420000, brand:"Zara",        category:"ژاکت",  sizes:["M","L","XL","2XL","3XL"], colors:["#e5e7eb","#d6d3d1","#78350f"], offer:true,  pop:90,  img:"https://images.unsplash.com/photo-1548883354-1c1fb2c6d8be?q=80&w=900&auto=format&fit=crop"},
      {id:4, name:"شلوار جین 1431",        price:2400000, oldPrice:null,    brand:"Pull&Bear",  category:"شلوار", sizes:["30","31","32","33","34"], colors:["#3b82f6"], offer:false, pop:70,  img:"https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=900&auto=format&fit=crop"},
      {id:5, name:"سوییشرت مشکی 1254",     price:980000,  oldPrice:1580000, brand:"H&M",        category:"هودی",  sizes:["S","M","L","XL"], colors:["#0f172a"], offer:true,  pop:76,  img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=900&auto=format&fit=crop"},
      {id:6, name:"کفش خاکی 862",          price:349000,  oldPrice:420000,  brand:"New Balance",category:"کفش",   sizes:["41","42","43"],   colors:["#6b7280","#a8a29e"], offer:true,  pop:83,  img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop"},
      {id:7, name:"تیشرت ساده مشکی 1417",  price:850000,  oldPrice:null,    brand:"LC Waikiki", category:"تی‌شرت", sizes:["S","M","L","XL"], colors:["#111827"], offer:false, pop:65,  img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop"},
      {id:8, name:"کالج خاکستری 531",      price:289000,  oldPrice:399000,  brand:"Skechers",   category:"کفش",   sizes:["40","41","42","43"], colors:["#9ca3af"], offer:true,  pop:61,  img:"https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop"},
      {id:9, name:"پیراهن طرح‌دار 523",    price:1460000, oldPrice:1890000, brand:"Pull&Bear",  category:"پیراهن",sizes:["M","L","XL"], colors:["#111827","#ef4444"], offer:true,  pop:72,  img:"https://images.unsplash.com/photo-1520975796338-47dd0952f0e1?q=80&w=900&auto=format&fit=crop"},
      {id:10,name:"بلوز گلدار 207",        price:1290000, oldPrice:1490000, brand:"Zara",        category:"بلوز",  sizes:["S","M","L"],    colors:["#ef4444","#111827"], offer:true,  pop:60,  img:"https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=900&auto=format&fit=crop"},
      {id:11,name:"کتانی خاکی بلند 871",    price:395000,  oldPrice:null,    brand:"New Balance",category:"کفش",   sizes:["41","42","43","44"], colors:["#6b7280"], offer:false, pop:55,  img:"https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=900&auto=format&fit=crop"},
      {id:12,name:"تیشرت کالج 221",        price:690000,  oldPrice:990000,  brand:"H&M",        category:"تی‌شرت", sizes:["S","M","L","XL"], colors:["#1e293b","#64748b"], offer:true,  pop:74,  img:"https://images.unsplash.com/photo-1520975796338-47dd0952f0e1?q=80&w=900&auto=format&fit=crop"},
      {id:13,name:"کاپشن سفید 860",        price:2650000, oldPrice:3050000, brand:"Zara",        category:"ژاکت",  sizes:["M","L","XL","2XL"], colors:["#e5e7eb"], offer:true,  pop:78,  img:"https://images.unsplash.com/photo-1545194827-cb0438295bbc?q=80&w=900&auto=format&fit=crop"},
    ];

    /* ---------- وضعیت صفحه ---------- */
    const state = {
      filters: {
        categories: new Set(),
        sizes: new Set(),
        colors: new Set(),
        brands: new Set(),
        offerOnly: false,
        minPrice: 100000,
        maxPrice: 10000000,
      },
      sort: "pop-desc",
      page: 1,
      pageSize: 9,
      pendingApply: {}, // برای دکمه «اعمال»
    };

    /* ---------- المنت‌ها ---------- */
    const grid = document.getElementById("grid");
    const pagesEl = document.getElementById("pages");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const offerOnlyEl = document.getElementById("offerOnly");
    const sortEl = document.getElementById("sort");
    const stateBar = document.getElementById("stateBar");

    const catList = document.getElementById("catList");
    const sizeList = document.getElementById("sizeList");
    const colorList = document.getElementById("colorList");
    const brandList = document.getElementById("brandList");
    const brandSearch = document.getElementById("brandSearch");

    const minPrice = document.getElementById("minPrice");
    const maxPrice = document.getElementById("maxPrice");
    const minPriceLabel = document.getElementById("minPriceLabel");
    const maxPriceLabel = document.getElementById("maxPriceLabel");

    const applyBtn = document.getElementById("applyFilters");
    const resetBtn = document.getElementById("resetFilters");
    const filterPanel = document.getElementById("filterPanel");
    const mobileFilterBtn = document.getElementById("mobileFilterBtn");

    /* ---------- ساخت گزینه‌های فیلتر از روی داده ---------- */
    const uniq = (arr) => [...new Set(arr)];
    const CATEGORIES = uniq(PRODUCTS.map(p => p.category));
    const SIZES = uniq(PRODUCTS.flatMap(p => p.sizes));
    const COLORS = uniq(PRODUCTS.flatMap(p => p.colors));
    const BRANDS = uniq(PRODUCTS.map(p => p.brand));

    function buildCheckbox(container, items, group, cols2 = true) {
      container.innerHTML = "";
      items.forEach(v => {
        const id = `${group}-${v}`.replace(/\s/g,'');
        const wrap = document.createElement("label");
        wrap.className = (cols2 ? "inline-flex" : "flex") + " items-center gap-2 rounded-xl border px-3 py-2 text-sm cursor-pointer hover:bg-gray-50";
        wrap.innerHTML = `<input type="checkbox" id="${id}" class="accent-amber-500" data-group="${group}" data-value="${v}"/>
                          <span>${v}</span>`;
        container.appendChild(wrap);
      });
    }

    // دسته‌بندی و برند
    buildCheckbox(catList, CATEGORIES, "cat");
    buildCheckbox(brandList, BRANDS, "brand");

    // سایز (چیب)
    sizeList.innerHTML = SIZES.map(s =>
      `<button type="button" data-size="${s}" class="size-chip inline-flex items-center justify-center rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50" aria-pressed="false">${s}</button>`
    ).join("");

    // رنگ (دایره)
    colorList.innerHTML = COLORS.map(c =>
      `<button type="button" data-color="${c}" class="color-chip relative size-9 rounded-full border" style="background:${c}" aria-pressed="false">
        <span class="sr-only">رنگ ${c}</span>
      </button>`
    ).join("");

    /* ---------- کمک‌رسان‌های رابط ---------- */
    function applyPendingToState() {
      state.filters = {...state.filters, ...state.pendingApply};
      state.pendingApply = {};
    }

    function resetFiltersUI() {
      // چک‌باکس‌ها
      [...catList.querySelectorAll("input[type=checkbox]")].forEach(i => i.checked = false);
      [...brandList.querySelectorAll("input[type=checkbox]")].forEach(i => i.checked = false);
      // چیپ‌ها
      [...sizeList.querySelectorAll(".size-chip")].forEach(b => { b.classList.remove("bg-amber-50","border-amber-400"); b.setAttribute("aria-pressed","false"); });
      [...colorList.querySelectorAll(".color-chip")].forEach(b => { b.classList.remove("ring","ring-amber-400"); b.setAttribute("aria-pressed","false"); });
      // قیمت
      minPrice.value = 100000; maxPrice.value = 10000000;
      updatePriceLabels(minPrice.value, maxPrice.value);
      // سوییچ
      offerOnlyEl.checked = false;
      // استیت
      state.filters = { categories:new Set(), sizes:new Set(), colors:new Set(), brands:new Set(), offerOnly:false, minPrice:100000, maxPrice:10000000 };
      state.page = 1;
    }

    function updatePriceLabels(min, max){
      minPriceLabel.textContent = "حداقل: " + toman(+min);
      maxPriceLabel.textContent = "حداکثر: " + toman(+max);
    }
    updatePriceLabels(minPrice.value, maxPrice.value);

    /* ---------- رویدادها (تغییر UI) ---------- */
    // چک‌باکس‌های دسته و برند
    function handleGroupCheck(e){
      const cb = e.target.closest("input[type=checkbox]");
      if(!cb) return;
      const group = cb.dataset.group;
      const val = cb.dataset.value;
      const set = (state.pendingApply[group==="cat"?"categories":"brands"] ?? new Set([...state.filters[group==="cat"?"categories":"brands"]]));
      cb.checked ? set.add(val) : set.delete(val);
      state.pendingApply[group==="cat"?"categories":"brands"] = set;
    }
    catList.addEventListener("change", handleGroupCheck);
    brandList.addEventListener("change", handleGroupCheck);

    // انتخاب سایز
    sizeList.addEventListener("click", (e)=>{
      const btn = e.target.closest(".size-chip"); if(!btn) return;
      const v = btn.dataset.size;
      const set = (state.pendingApply.sizes ?? new Set([...state.filters.sizes]));
      const active = btn.getAttribute("aria-pressed")==="true";
      if(active){ set.delete(v); btn.classList.remove("bg-amber-50","border-amber-400"); btn.setAttribute("aria-pressed","false"); }
      else { set.add(v); btn.classList.add("bg-amber-50","border-amber-400"); btn.setAttribute("aria-pressed","true"); }
      state.pendingApply.sizes = set;
    });

    // انتخاب رنگ
    colorList.addEventListener("click", (e)=>{
      const btn = e.target.closest(".color-chip"); if(!btn) return;
      const v = btn.dataset.color;
      const set = (state.pendingApply.colors ?? new Set([...state.filters.colors]));
      const active = btn.getAttribute("aria-pressed")==="true";
      if(active){ set.delete(v); btn.classList.remove("ring","ring-amber-400"); btn.setAttribute("aria-pressed","false"); }
      else { set.add(v); btn.classList.add("ring","ring-amber-400"); btn.setAttribute("aria-pressed","true"); }
      state.pendingApply.colors = set;
    });

    // قیمت
    function clampPrices(){
      if(+minPrice.value > +maxPrice.value){ const t=minPrice.value; minPrice.value=maxPrice.value; maxPrice.value=t; }
      updatePriceLabels(minPrice.value, maxPrice.value);
      state.pendingApply.minPrice = +minPrice.value;
      state.pendingApply.maxPrice = +maxPrice.value;
    }
    minPrice.addEventListener("input", clampPrices);
    maxPrice.addEventListener("input", clampPrices);

    // برند سرچ
    brandSearch.addEventListener("input", ()=>{
      const q = brandSearch.value.trim();
      const items = brandList.querySelectorAll("label");
      items.forEach(l => l.classList.toggle("hidden", q && !l.textContent.includes(q)));
    });

    // سوییچ‌ها و سورت
    offerOnlyEl.addEventListener("change", ()=>{ state.filters.offerOnly = offerOnlyEl.checked; state.page=1; render(); });
    sortEl.addEventListener("change", ()=>{ state.sort = sortEl.value; state.page=1; render(); });

    // اعمال/بازنشانی
    applyBtn.addEventListener("click", ()=>{ applyPendingToState(); state.page=1; render(true); });
    resetBtn.addEventListener("click", ()=>{ resetFiltersUI(); render(true); });

    // صفحه‌بندی
    prevBtn.addEventListener("click", ()=>{ if(state.page>1){ state.page--; render(); } });
    nextBtn.addEventListener("click", ()=>{ state.page++; render(); });
    pagesEl.addEventListener("click", (e)=>{
      const b = e.target.closest("button[data-page]"); if(!b) return;
      state.page = +b.dataset.page; render();
    });

    // فیلتر موبایل
    mobileFilterBtn.addEventListener("click", ()=>{
      const open = filterPanel.classList.contains("hidden");
      filterPanel.classList.toggle("hidden", !open ? false:true); // نمایش
      if(open){
        filterPanel.classList.remove("md:block");
        filterPanel.classList.add("fixed","inset-0","z-[60]","bg-white","p-4","overflow-y-auto");
        document.body.classList.add("overflow-hidden");
      } else {
        filterPanel.classList.remove("fixed","inset-0","z-[60]","bg-white","p-4","overflow-y-auto");
        filterPanel.classList.add("md:block");
        document.body.classList.remove("overflow-hidden");
      }
    });

    /* ---------- رندر محصولات ---------- */
    function applyFilters(data){
      let list = data.filter(p =>
        p.price >= state.filters.minPrice &&
        p.price <= state.filters.maxPrice
      );

      if(state.filters.offerOnly) list = list.filter(p => p.oldPrice && p.oldPrice > p.price);

      if(state.filters.categories.size)
        list = list.filter(p => state.filters.categories.has(p.category));

      if(state.filters.sizes.size)
        list = list.filter(p => p.sizes.some(s => state.filters.sizes.has(s)));

      if(state.filters.colors.size)
        list = list.filter(p => p.colors.some(c => [...state.filters.colors].includes(c)));

      if(state.filters.brands.size)
        list = list.filter(p => state.filters.brands.has(p.brand));

      // سورت
      list.sort((a,b)=>{
        switch(state.sort){
          case "price-asc": return a.price - b.price;
          case "price-desc": return b.price - a.price;
          case "discount-desc":
            const da = a.oldPrice ? (a.oldPrice-a.price)/a.oldPrice : 0;
            const db = b.oldPrice ? (b.oldPrice-b.price)/b.oldPrice : 0;
            return db - da;
          case "newest": return b.id - a.id;
          case "pop-desc":
          default: return (b.pop||0) - (a.pop||0);
        }
      });

      return list;
    }

    function card(p){
      const discount = p.oldPrice ? Math.round((p.oldPrice - p.price) / p.oldPrice * 100) : 0;
      return `
      <article class="group rounded-2xl border overflow-hidden bg-white">
        <div class="relative">
          <img loading="lazy" src="${p.img}" alt="${p.name}" class="h-72 w-full object-cover" />
          ${discount ? `<span class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs">٪${toFaDigits(discount)}</span>`:``}
          ${p.id%3===0 ? `<span class="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs">کالکشن جدید</span>`:``}
        </div>
        <div class="p-3 sm:p-4">
          <h3 class="mb-2 line-clamp-1 text-right text-base">${p.name}</h3>

          <div class="flex items-end justify-between">
            <div class="text-left">
              ${p.oldPrice ? `<div class="text-xs text-gray-500 line-through">${toman(p.oldPrice)}</div>`:""}
              <div class="text-lg font-medium">${toman(p.price)}</div>
            </div>
            <div class="flex items-center gap-2 text-xs text-gray-600">
              <span class="inline-flex items-center rounded-lg border px-2 py-1"> ${toFaDigits(p.colors.length)} رنگ </span>
              <span class="inline-flex items-center rounded-lg border px-2 py-1"> ${toFaDigits(p.sizes.length)} سایز </span>
            </div>
          </div>

          <div class="mt-3 flex flex-wrap gap-1.5">
            ${p.colors.map(c=>`<span class="inline-block size-5 rounded-full border" style="background:${c}"></span>`).join("")}
          </div>
        </div>
        <a href="#" class="sr-only">مشاهده ${p.name}</a>
      </article>`;
    }

    function render(showToast=false){
      const list = applyFilters(PRODUCTS);
      const total = list.length;
      const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
      if(state.page > totalPages) state.page = totalPages;

      // صفحه‌بندی
      const start = (state.page-1) * state.pageSize;
      const pageItems = list.slice(start, start + state.pageSize);

      // رندر کارت‌ها
      grid.innerHTML = pageItems.map(card).join("");

      // رندر صفحات
      pagesEl.innerHTML = Array.from({length: totalPages}, (_,i)=>i+1).map(i=>{
        const active = i===state.page;
        return `<button data-page="${i}" class="rounded-lg border px-3 py-1.5 text-sm ${active?"bg-amber-500 text-white border-amber-500":"hover:bg-gray-50"}">${toFaDigits(i)}</button>`;
      }).join("");
      prevBtn.disabled = state.page===1;
      nextBtn.disabled = state.page===totalPages;

      // نوار وضعیت
      const parts = [];
      if(state.filters.categories.size) parts.push([...state.filters.categories].join("، "));
      if(state.filters.brands.size) parts.push("برند: "+[...state.filters.brands].join("، "));
      if(state.filters.sizes.size) parts.push("سایز: "+[...state.filters.sizes].join("، "));
      if(state.filters.colors.size) parts.push("رنگ: "+toFaDigits(state.filters.colors.size)+" مورد");
      if(state.filters.offerOnly) parts.push("فقط تخفیف‌دار");
      parts.push(`قیمت: ${toman(state.filters.minPrice)} تا ${toman(state.filters.maxPrice)}`);
      if(parts.length){
        stateBar.textContent = `${toFaDigits(total)} کالا – ${parts.join(" | ")}`;
        stateBar.classList.remove("hidden");
      } else {
        stateBar.classList.add("hidden");
      }

      if(showToast){
        // فیدبک کوچک
        stateBar.classList.add("ring","ring-amber-200");
        setTimeout(()=>stateBar.classList.remove("ring","ring-amber-200"), 500);
      }
    }

    // مقداردهی اولیه
    offerOnlyEl.checked = state.filters.offerOnly;
    sortEl.value = state.sort;

    // اعمال فوری مقدار اسلایدرها به pending
    state.pendingApply.minPrice = +minPrice.value;
    state.pendingApply.maxPrice = +maxPrice.value;

    // اولین رندر
    applyPendingToState();
    render();