# URL State And Deep Links

Product filters live in the URL: `/products?search=demo&status=active&page=2`.

Product detail pages use route params: `/products/product-3`.

I keep search, filters, page number, and entity ids in the URL because they are shareable and work with browser back and forward. I avoid putting selected rows or density in the URL because those are local UI preferences.
