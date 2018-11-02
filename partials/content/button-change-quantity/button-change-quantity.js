export default new class ButtonChangeQuantity {
    constructor () {
        /* selectors */
        this.productQuantitySelector = '.product-detailed__btn-qty';
        this.btnQuantityChangeSelector = '.product-detailed__btn-qty-change';
        this.quantitySelector = '.product-detailed__btn-qty-input';

        /* variables */
        this.checkQuantityRegExp = /^\+?(0|[1-9]\d*)$/;

        this.eventHandlers();
    }

    eventHandlers () {
        if(!$(this.productQuantitySelector).length) {
            return;
        }

        const _this = this;

        $(document).on('click', this.btnQuantityChangeSelector, function(e) {
            const $btn = $(e.currentTarget);
            const $productQuantityInput = $btn.parent().find(_this.quantitySelector);
            let productQuantity = $productQuantityInput.val();

            const isQuantityValid = _this.checkQuantityValidity(productQuantity);

            if (isQuantityValid) {
                if($btn.attr('data-qty') === 'minus') {
                    _this.reduceQuantity($productQuantityInput, productQuantity);
                } else if ($btn.attr('data-qty') === 'plus') {
                    _this.addQuantuty($productQuantityInput, productQuantity);
                }
            }
        });
    }

    checkQuantityValidity (quantity) {
        const _this = this;

        return _this.checkQuantityRegExp.test(quantity);
    }

    addQuantuty (productQuantityInput, productQuantity) {
        $(productQuantityInput).val(+productQuantity + 1);
    }

    reduceQuantity (productQuantityInput, productQuantity) {
        if (productQuantity > 1) {
            $(productQuantityInput).val(+productQuantity - 1);
        }
    }

} ();
