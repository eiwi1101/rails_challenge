class EfinJob < ApplicationJob
  def perform(client, data)
    Rails.logger.tagged 'EfinJob' do
      request = RestClient.post 'http://efin.oddball.io', data.to_json, content_type: :json
      response = Hash.from_xml(request.body)

      Rails.logger.debug "EFIN Response: #{response.inspect}"

      if !response.include?('root') or !response['root'].include?('efin')
        EfinChannel.broadcast client, status: 'error', error: 'Invalid response from server.'
      else
        efin = response['root']['efin']
        EfinChannel.broadcast client, status: 'processed', efin: efin
      end
    end
  rescue RestClient::ExceptionWithResponse => e
    response = JSON.parse e.response
    EfinChannel.broadcast client, { status: 'error' }.merge(response)
  end
end
