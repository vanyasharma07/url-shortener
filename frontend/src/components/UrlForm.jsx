import React, { useState } from 'react'
import axios from 'axios'
import { createShortUrl } from '../api/shortUrl.api.js'

const UrlForm = () => {
    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)
   
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        try {
            const data = await createShortUrl(url);
    
            setShortUrl(data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl)
        setCopied(true)

        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-5">

            <h1 className="text-2xl font-semibold text-center text-gray-800">
                 URL Shortener
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your long URL here..."
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                    {loading ? "Shortening..." : "Shorten URL"}
                </button>

            </form>

            {shortUrl && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-center">

                    <p className="text-sm text-gray-600">
                        Your shortened link 
                    </p>

                    <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 font-medium break-all"
                    >
                        {shortUrl}
                    </a>

                    <button
                        onClick={handleCopy}
                        className={`px-4 py-1.5 rounded-lg text-sm transition ${
                            copied
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {copied ? "Copied! " : "Copy"}
                    </button>

                </div>
            )}

        </div>
    )
}

export default UrlForm