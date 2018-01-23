require 'securerandom'

class EfinChannel < ApplicationCable::Channel
  def subscribed
    stream_from params[:userToken]
  end

  def receive(data)
    client = params[:userToken]
    return unless validate client, data

    EfinJob.perform_later client, data
    broadcast client, status: 'processing'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def self.broadcast(client, data)
    ActionCable.server.broadcast client, data
  end

  private

  def broadcast(client, data)
    EfinChannel.broadcast client, data
  end

  def validate(client, data)
    errors = {}
    valid = true

    %w(household income).each do |k|
      if data[k].nil? or data[k] !~ /\A\d+\z/
        errors[k] = "must be a valid number"
        valid = false
      end
    end

    if not valid
      broadcast client, status: 'error', error: 'Please correct your entries.', errors: errors
      false
    else
      true
    end
  end
end
