desc "Refreshes materialized views"
task fresh_materialized_views: :environment do
  ActiveRecord::Base.connection.execute %{
    REFRESH MATERIALIZED VIEW CONCURRENTLY customer_details
  }
end
