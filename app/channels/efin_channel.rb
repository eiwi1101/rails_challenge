require 'securerandom'

class EfinChannel < ApplicationCable::Channel
  def subscribed
    stream_from params[:userToken]
  end

  def receive(data)
    EfinJob.perform_later params[:userToken], data
    broadcast status: 'processing'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def self.broadcast(client, data)
    ActionCable.server.broadcast client, data
  end

  private

  def broadcast(data)
    EfinChannel.broadcast params[:usertoken], data
  end
end
