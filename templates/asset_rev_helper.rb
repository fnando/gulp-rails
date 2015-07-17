module AssetRevHelper
  REV_MANIFEST_FILE = 'public/rev-manifest.json'.freeze

  def rev_manifest_file
    Rails.root.join(REV_MANIFEST_FILE)
  end

  def rev_manifest?
    rev_manifest_file.exist?
  end

  def rev_manifest
    @rev_manifest ||= JSON.load(rev_manifest_file.read)
  end

  def path_to_asset(source, options = {})
    path = super(source, options)
    asset_host = Rails.configuration.action_controller.asset_host.to_s

    # No rev manifest? Just return path.
    return File.join(asset_host, path) unless rev_manifest?

    # Remove asset_host from source, so we
    # can search for file on manifest.
    path = path.gsub(asset_host, '')

    # Try to find file on manifest; use path otherwise.
    path = rev_manifest[path[1..-1]] || path

    # Return the final url.
    File.join(asset_host, path)
  end
end
