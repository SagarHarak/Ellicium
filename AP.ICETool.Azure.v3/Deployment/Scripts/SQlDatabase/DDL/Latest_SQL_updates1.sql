IF EXISTS   (Select 1 from dbo.dashboard_tableau dt where display_name ='Merchant Workbench')
    BEGIN
        Update dbo.dashboard_tableau set category_analytics = 1 where display_name = 'Merchant Workbench';
    END;

IF EXISTS   (Select 1 from dbo.dashboard_tableau dt where img_url='cost-details-icon.png')
BEGIN
    update dbo.dashboard_tableau set img_url='cost-details-icon.svg' where img_url='cost-details-icon.png'
END;

IF EXISTS   (Select 1 from dbo.dashboard_tableau dt where img_url='Merchant Workbench.svg')
BEGIN
    update dbo.dashboard_tableau set img_url='Merchant Workbench.png' where img_url='Merchant Workbench.svg'
END;