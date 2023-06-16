CREATE view [icr].[basket_over_time] as

WITH bp AS
(
	SELECT
		b.name as Basket,
		c.description as Commodity,
		bc.percentage,
		cd.Date,
		cd.value as Price,
		cd.value * bc.percentage as AggPrice
	FROM
		icr.basket b INNER JOIN
		icr.basket_commodities bc ON b.id = bc.basket_id INNER JOIN
		target.dim_commodities c on bc.commodity_id = c.id INNER JOIN
		viz.all_commodities_data cd on cd.Index_Ticker = c.index_ticker
	WHERE cd.Date = b.baseline_date
),

bpAgg AS
(
	SELECT
		Basket,
		Date as BaselineDate,
		SUM(AggPrice) as baseline
	FROM
		bp
	GROUP BY
		Basket,
		Date
)


SELECT
	b.name as Basket,
	c.description as Commodity,
	cd.Date,
	cd.value * bc.percentage as Price,
	ag.BaselineDate,
	ag.baseline as BaselinePrice
FROM
	icr.basket b INNER JOIN
	icr.basket_commodities bc ON b.id = bc.basket_id INNER JOIN
	target.dim_commodities c on bc.commodity_id = c.id INNER JOIN
	viz.all_commodities_data cd on cd.Index_Ticker = c.index_ticker INNER JOIN
	bpAgg ag on b.Name = ag.Basket
WHERE cd.Date <= '2022-08-01';